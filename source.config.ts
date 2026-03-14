import { metaSchema, pageSchema } from 'fumadocs-core/source/schema'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { shikiThemes } from '@/lib/shiki'

export const docs = defineDocs({
  dir: 'docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    // MDX options
    remarkCodeTabOptions: {
      parseMdx: true,
    },
    rehypeCodeOptions: {
      themes: shikiThemes,
    },
  },
})
