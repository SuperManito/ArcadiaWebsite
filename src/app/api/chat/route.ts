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

// 定义模型优先级列表（依次尝试）
const MODEL_PRIORITY = [
  process.env.OPENROUTER_MODEL ?? 'openrouter/free', // 首选模型（环境变量或默认免费模型）
  'openrouter/free', // 备选免费模型（当首选模型失败时使用）
]

// 判断错误是否可重试（触发模型切换）
function isRetryableError(error: unknown): boolean {
  // OpenRouter API 返回的错误通常具有 status 属性
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status?: number }).status
    // 429 = 配额用尽/频率限制，503 = 服务暂时不可用
    if (status === 429 || status === 503) {
      return true
    }
    // 检查 OpenRouter 返回的错误码
    const body = (error as { body?: unknown }).body
    if (body && typeof body === 'object') {
      const errorBody = body as { error?: { code?: string } }
      if (errorBody.error?.code === 'rate-limited'
        || errorBody.error?.code === 'service_unavailable') {
        return true
      }
    }
  }
  // 网络层面错误（连接超时、断开等）
  if (error && typeof error === 'object') {
    const networkError = error as { code?: string }
    if (networkError.code === 'ECONNABORTED'
      || networkError.code === 'ETIMEDOUT'
      || networkError.code === 'ENOTFOUND') {
      return true
    }
  }

  return false
}

export async function POST(req: Request) {
  let lastError: Error | null = null
  // 遍历模型优先级列表
  for (const [index, modelId] of MODEL_PRIORITY.entries()) {
    // 确保 modelId 不为空
    if (!modelId) {
      continue
    }
    try {
      const reqJson = await req.json()
      const result = streamText({
        model: openrouter.chat(modelId),
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
      // console.log(`✅ 模型 ${modelId} 调用成功`)
      return result.toUIMessageStreamResponse()
    }
    catch (error) {
      // console.error(`❌ 模型 ${modelId} 调用失败:`, error)
      lastError = error as Error
      // 如果错误可重试（配额用尽/服务不可用），继续尝试下一个模型
      if (isRetryableError(error)) {
        // 如果是最后一个模型，就不继续了
        if (index === MODEL_PRIORITY.length - 1) {
          break
        }
        continue
      }
      else {
        break
      }
    }
  }

  // 所有模型都尝试失败后，返回错误响应
  return new Response(
    JSON.stringify({
      error: '所有可用模型调用失败',
      message: '请检查网络连接或配置',
      attemptedModels: MODEL_PRIORITY.filter(Boolean),
      lastError: lastError?.message,
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // 避免缓存错误响应
      },
    },
  )
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
