import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';

import { Icon } from '@/components/Icon';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    Icon,
    ...components,
  };
}
