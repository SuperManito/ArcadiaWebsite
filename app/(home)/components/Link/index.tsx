import NextLink from 'next/link'
import React from 'react'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string
  to?: string
}

export default function Link({ href, to, ...props }: LinkProps) {
  const url = href || to || '/'
  return <NextLink href={url} {...props as Record<string, unknown>} />
}
