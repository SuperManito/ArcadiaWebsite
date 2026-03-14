import type { ComponentProps } from 'react'
import type { TypeNode } from './index'
import { highlight } from 'fumadocs-core/highlight'
import { TypeTable } from './index'

/**
 * Server Component wrapper for TypeTable.
 * Pre-highlights all string `type` fields using Shiki, then passes to the Client Component.
 */
export async function TypeTableServer({
  type,
  ...props
}: { type: Record<string, TypeNode>, noRequiredMark?: boolean } & ComponentProps<'div'>) {
  const entries = await Promise.all(
    Object.entries(type).map(async ([key, value]) => {
      const highlightedType = typeof value.type === 'string'
        ? await highlight(value.type, { lang: 'ts', themes: {
            light: 'github-light',
            dark: 'github-dark',
          } })
        : value.type
      return [key, { ...value, type: highlightedType }] as [string, TypeNode]
    }),
  )
  return <TypeTable type={Object.fromEntries(entries)} {...props} />
}
