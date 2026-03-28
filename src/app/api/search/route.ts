import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { createFromSource } from 'fumadocs-core/search/server'
import { source } from '@/lib/source'

// statically cached
export const revalidate = false
export const { staticGET: GET } = createFromSource(source, {
  buildIndex(page) {
    return {
      title: page.data.title || '',
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.path.startsWith('(main)') ? 'main' : page.slugs[0],
    }
  },
  tokenizer: createTokenizer({
    language: 'mandarin',
    stopWords: mandarinStopwords,
  }),
  search: {
    threshold: 0,
    tolerance: 0,
  },
})
