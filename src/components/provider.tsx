'use client'
import { i18nProvider } from 'fumadocs-ui/i18n'
import { RootProvider } from 'fumadocs-ui/provider/next'
import SearchDialog from '@/components/search'
import { translations } from '@/lib/i18n'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      i18n={i18nProvider(translations)}
      search={{ SearchDialog }}
    >
      {children}
    </RootProvider>
  )
}
