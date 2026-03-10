import type { MDXComponents } from 'mdx/types'
import { createFileSystemGeneratorCache, createGenerator } from 'fumadocs-typescript'
import { AutoTypeTable } from 'fumadocs-typescript/ui'
import * as TabsComponents from 'fumadocs-ui/components/tabs'

import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Icon } from '@/components/Icon'

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
})

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    AutoTypeTable: props => <AutoTypeTable {...props} generator={generator} />,
    Icon,
    ...components,
  }
}
