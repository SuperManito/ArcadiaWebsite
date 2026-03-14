'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function TabThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  let themeClass = 'theme-teal'
  if (pathname.startsWith('/docs/cli'))
    themeClass = 'theme-sky'
  else if (pathname.startsWith('/docs/api'))
    themeClass = 'theme-amber'
  else if (pathname.startsWith('/docs/openapi'))
    themeClass = 'theme-fuchsia'

  return (
    <div className={`contents ${themeClass}`}>
      {children}
    </div>
  )
}
