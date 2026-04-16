import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { MessageCircleIcon } from 'lucide-react'
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search'
import AISearchLinkButton from '@/components/ai/search-link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/cn'
import { baseOptions, DocsTabs } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { TabThemeProvider } from './theme-provider'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, links, ...base } = baseOptions()
  return (
    <TabThemeProvider>
      <AISearch>
        <DocsLayout
          {...base}
          themeSwitch={{
            component: <ThemeToggle />,
          }}
          nav={{
            ...nav,
            mode: 'top',
            transparentMode: 'always',
          }}
          links={[
            { type: 'custom', children: <AISearchLinkButton /> },
            ...(links ?? []),
          ]}
          tree={source.getPageTree()}
          sidebar={{
            tabs: DocsTabs,
            collapsible: false,
          }}
        >
          {children}
          <span className="absolute block inset-0 overflow-hidden bg-[radial-gradient(100%_37.02%_at_50%_-7.2%,var(--color-fd-primary-rgba)_39.4%,rgba(0,0,0,0)_100%)] md:bg-[radial-gradient(49.63%_57.02%_at_50%_-7.2%,var(--color-fd-primary-rgba)_39.4%,rgba(0,0,0,0)_100%)] pointer-events-none h-256" />
          <AISearchPanel />
          <AISearchTrigger
            position="float"
            className={cn(
              buttonVariants({
                variant: 'secondary',
                className: 'text-fd-muted-foreground rounded-2xl',
              }),
            )}
          >
            <MessageCircleIcon className="size-4.5" />
            询问 AI
          </AISearchTrigger>
        </DocsLayout>
      </AISearch>
    </TabThemeProvider>
  )
}
