import Link from 'fumadocs-core/link'
import React from 'react'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string
  to?: string
}

export default function LinkComponents({ href, to, ...props }: LinkProps) {
  const url = href || to || '/'
  return <Link href={url} {...props as Record<string, unknown>} />
}
