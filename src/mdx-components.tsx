import type { MDXComponents } from 'mdx/types'
import * as AccordionComponents from 'fumadocs-ui/components/accordion'
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { APIPage } from '@/components/APIPage'
import { Icon } from '@/components/Icon'
import * as TypeTableComponents from '@/components/TypeTable'
import { TypeTableServer } from '@/components/TypeTable/TypeTableServer'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...TypeTableComponents,
    TypeTable: TypeTableServer,
    ...AccordionComponents,
    APIPage,
    Icon,
    ...components,
  }
}
