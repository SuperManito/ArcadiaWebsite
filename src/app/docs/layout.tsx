import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { MessageCircleIcon } from 'lucide-react'
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/cn'
import { baseOptions, DocsTabs } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { TabThemeProvider } from './theme-provider'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, ...base } = baseOptions()
  return (
    <TabThemeProvider>
      <DocsLayout
        {...base}
        themeSwitch={{
          component: <ThemeToggle />,
        }}
        nav={{
          ...nav,
          mode: 'top',
        }}
        tree={source.getPageTree()}
        sidebar={{
          tabs: DocsTabs,
          collapsible: false,
        }}
      >
        {children}
        <AISearch>
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
        </AISearch>
      </DocsLayout>
    </TabThemeProvider>
  )
}
