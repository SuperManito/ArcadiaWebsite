import type { GatewayModelId, UIMessage } from 'ai'
import type { DocumentData } from 'flexsearch'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { convertToModelMessages, stepCountIs, streamText, tool } from 'ai'
import { Document } from 'flexsearch'
import { z } from 'zod'
import { source } from '@/lib/source'

// 定义模型列表
const MODEL_PRIORITY: GatewayModelId[] = [
  'z-ai/glm-4.5-air:free',
  'minimax/minimax-m2.5:free',
  'google/gemma-4-26b-a4b-it:free',
  'openrouter/free',
]

// 过滤搜索路径
const EXCLUDE_PATHS = [
  '/docs/changelog',
  '/docs/api',
  '/docs/openapi',
]

// 定义提示词
const SYSTEM_PROMPT = [
  'You are an AI assistant for a documentation site. This is a one-stop platform for automated code development and operations, project named Arcadia.',
  'You must use the `search` tool to retrieve relevant document content before answering.',
  'The `search` tool returns raw JSON results from documentation. Use those results to ground your answer and cite sources as markdown links using the document `url` field when available.',
  'Your responses must strictly adhere to the documentation for the Arcadia platform. Do not use any knowledge from your training data, even if you believe it to be common sense or generally correct.',
  'If the search results do not contain an answer to the user\'s question, respond that you do not know and suggest a better search query. Do not attempt to infer, guess, or supplement the answer using your own knowledge.',
  'The Arcadia platform documentation includes introductory guides and CLI-specific documentation. You may need to infer the user\'s specific use case to provide an appropriate response.',
  'Please prioritize answering in Simplified Chinese (Mandarin).',

  'Additional constraints:',
  '1. Do not extrapolate from search results. Every claim must have a direct, verbatim match in the search results.',
  '2. If search results are relevant but lack the specific answer, still respond that you do not know. Do not fill missing details with general knowledge.',
  '3. Never use phrases like "based on my understanding", "as an AI", "generally speaking". Answer only when search results support it.',
  '4. Do not mention any domain names. Use only the `url` from search results. Never invent or guess a URL.',

  'Domain-specific routing rules (these override general behavior):',

  'Rule 1 - Dependency management:',
  'When the user asks about "dependency management", "dependency installation", "installing dependencies", "依赖管理", "依赖安装", or any related variant:',
  'You MUST search the "运行环境" (Runtime Environment) documentation page, specifically the sections titled "安装语言环境" (Installing Language Environment) and "解决依赖" (Resolving Dependencies).',
  'Base your answer exclusively on content found in those two sections.',
  'If those sections do not contain the answer, respond that you cannot find the information and suggest the user check the "运行环境" page directly.',

  'Rule 2 - Script subscription / Code sync (term equivalence):',
  'When users ask about "脚本订阅" (script subscription), "代码订阅" (code subscription), "同步订阅" (sync subscription), "script subscription", "code subscription", or any related variant:',
  'These terms are equivalent to "代码同步" (Code Sync) functionality.',
  'You MUST search the "代码同步" (Code Sync) documentation page, read it thoroughly, and answer based on your understanding of that document.',
  'Base your answer exclusively on content found in that document.',
  'If the document does not contain the answer, respond that you cannot find the information and suggest the user check the "代码同步" page directly.',
].join('\n')

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
      if (EXCLUDE_PATHS.some(path => page.url.includes(path))) {
        return null
      }

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

export async function POST(req: Request) {
  const reqJson = await req.json()
  const [primaryModel, ...fallbackModels] = MODEL_PRIORITY

  const result = streamText({
    model: openrouter.chat(primaryModel, {
      ...(fallbackModels.length > 0 && {
        extraBody: {
          models: fallbackModels,
        },
      }),
    }),
    stopWhen: stepCountIs(5),
    tools: {
      // eslint-disable-next-line ts/no-use-before-define
      search: searchTool,
    },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
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
    query: z.string().optional().default(''),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    if (!query || query.trim().length === 0) {
      throw new Error('请输入搜索关键词。')
    }
    const search = await searchServer
    return await search.searchAsync(query.trim(), { limit, merge: true, enrich: true })
  },
})
