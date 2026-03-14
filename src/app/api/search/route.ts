import { createTokenizer } from '@orama/tokenizers/mandarin'
import { createFromSource } from 'fumadocs-core/search/server'
import { source } from '@/lib/source'

// statically cached
export const revalidate = false
export const { staticGET: GET } = createFromSource(source, {
  localeMap: {
    cn: {
      components: {
        tokenizer: createTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
  },
})
