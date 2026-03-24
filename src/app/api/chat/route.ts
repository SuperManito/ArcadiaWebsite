import type { UIMessage } from 'ai'
import type { DocumentData } from 'flexsearch'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { convertToModelMessages, stepCountIs, streamText, tool } from 'ai'
import { Document } from 'flexsearch'
import { z } from 'zod'
import { source } from '@/lib/source'

interface CustomDocument extends DocumentData {
  url: string
  title: string
  description: string
  content: string
}

export type ChatUIMessage = UIMessage<
  never,
  {
    client: {
      location: string
    }
  }
>

const searchServer = createSearchServer()

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: 'url',
      index: ['title', 'description', 'content'],
      store: true,
    },
  })

  const docs = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!('getText' in page.data))
        return null
      try {
        return {
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          content: await page.data.getText('processed'),
        } as CustomDocument
      }
      catch {
        return null
      }
    }),
  )

  const validDocs = docs.filter(Boolean)
  for (const doc of validDocs) {
    if (doc)
      search.add(doc)
  }

  return search
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50
  const out: O[] = []
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))))
  }
  return out
}

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

/** System prompt, you can update it to provide more specific information */
const systemPrompt = [
  '你是一个文档站点的 AI 助手。',
  '需要时，请使用 `search` 工具在回答前检索相关的文档内容。',
  '`search` 工具返回来自文档的原始 JSON 结果。请使用这些结果作为回答的依据，并在可用时使用文档的 `url` 字段以 Markdown 链接形式引用来源。',
  '如果在搜索结果中找不到答案，请说明你不知道，并建议一个更好的搜索查询。',
  '请优先使用简体中文（普通话）回答。',
].join('\n')

export async function POST(req: Request) {
  const reqJson = await req.json()

  const result = streamText({
    model: openrouter.chat(process.env.OPENROUTER_MODEL ?? 'openrouter/free'),
    stopWhen: stepCountIs(5),
    tools: {
      // eslint-disable-next-line ts/no-use-before-define
      search: searchTool,
    },
    messages: [
      { role: 'system', content: systemPrompt },
      ...(await convertToModelMessages<ChatUIMessage>(reqJson.messages ?? [], {
        convertDataPart(part) {
          if (part.type === 'data-client') {
            return {
              type: 'text',
              text: `[Client Context: ${JSON.stringify(part.data)}]`,
            }
          }
        },
      })),
    ],
    toolChoice: 'auto',
  })

  return result.toUIMessageStreamResponse()
}

export type SearchTool = typeof searchTool

const searchTool = tool({
  description: '搜索文档内容并返回原始 JSON 结果。',
  inputSchema: z.object({
    query: z.string().min(1, 'Query cannot be empty'),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    if (!query || query.trim().length === 0) {
      throw new Error('Search query is required and cannot be empty')
    }
    const search = await searchServer
    return await search.searchAsync(query.trim(), { limit, merge: true, enrich: true })
  },
})
