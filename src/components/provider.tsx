'use client'
import type { ReactNode } from 'react'
import { RootProvider } from 'fumadocs-ui/provider/next'
import SearchDialog from '@/components/search'
import { i18nUI } from '@/lib/i18n'

export function Provider({ children }: { children: ReactNode }) {
  return <RootProvider i18n={i18nUI.provider('cn')} search={{ SearchDialog }}>{children}</RootProvider>
}
