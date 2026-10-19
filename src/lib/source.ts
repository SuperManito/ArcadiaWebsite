import type { InferPageType } from 'fumadocs-core/source'
import type { BlogAuthor } from '@/lib/blog'
import { llms, loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import { defineCollections } from 'fumadocs-mdx/macro'
import { docs } from 'fumadocs-mdx:collections/server'
import { openapiPlugin } from 'fumadocs-openapi/server'
import { blogPageSchema } from '@/lib/blog'

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin(), openapiPlugin()],
})

export function getPageImageUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png']
  return {
    segments,
    url: `/${[page.locale, 'og', 'docs', ...segments].filter(Boolean).join('/')}`,
  }
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed')

  return `# ${page.data.title}

${processed}`
}

export const docsLlms = llms(source, {
  renderPage: async page => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
})

const blog = defineCollections({
  type: 'doc',
  dir: 'blog',
  schema: blogPageSchema,
})

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
})

export const blogAuthors: Record<string, BlogAuthor> = {
  SuperManito: {
    name: 'SuperManito',
    title: '维护者',
    url: 'https://github.com/SuperManito',
    image: 'https://avatars.githubusercontent.com/u/68613938',
  },
}
