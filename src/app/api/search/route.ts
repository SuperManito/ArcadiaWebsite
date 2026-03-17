import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { createFromSource } from 'fumadocs-core/search/server'
import { source } from '@/lib/source'

// statically cached
export const revalidate = false
export const { staticGET: GET } = createFromSource(source, {
  tokenizer: createTokenizer({
    language: 'mandarin',
    stopWords: mandarinStopwords,
  }),
  search: {
    threshold: 0,
    tolerance: 0,
  },
})
