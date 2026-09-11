import { createGetUrl } from 'fumadocs-core/source'
import { i18n } from './i18n'

export const docsContentRoute = '/llms.mdx/docs'

const getContentUrl = createGetUrl(docsContentRoute, i18n)

export function getPageMarkdownUrl(page: { slugs: string[], locale?: string }) {
  const segments = [...page.slugs, 'content.md']

  return { segments, url: getContentUrl(segments, page.locale) }
}
