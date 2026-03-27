import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { BookOpen, MessageCircleIcon, Plug, Shapes, Terminal } from 'lucide-react'
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search'
import { cn } from '@/lib/cn'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

import { TabThemeProvider } from './theme-provider'

function TabIcon({ icon, className }: { icon: React.ReactNode, className?: string }) {
  return (
    <div
      className={`[&_svg]:size-full rounded-lg size-full max-md:border max-md:p-1.5 ${className}`}
    >
      {icon}
    </div>
  )
}

const DocsTabs = [
  {
    title: '入门指南',
    description: '使用文档',
    url: '/docs',
    icon: <TabIcon icon={<BookOpen />} className="text-[#14b8a6] dark:text-[#5eeab0] max-md:bg-[#14b8a6]/10 dark:max-md:bg-[#5eeab0]/10" />,
  },
  {
    title: 'Arcadia CLI',
    description: '命令行',
    url: '/docs/cli',
    icon: <TabIcon icon={<Terminal />} className="text-[#0ea5e9] dark:text-[#7dd3fc] max-md:bg-[#0ea5e9]/10 dark:max-md:bg-[#7dd3fc]/10" />,
  },
  {
    title: 'Arcadia API',
    description: '应用程序接口',
    url: '/docs/api',
    icon: <TabIcon icon={<Plug />} className="text-[#d97706] dark:text-[#fbbf24] max-md:bg-[#d97706]/10 dark:max-md:bg-[#fbbf24]/10" />,
  },
  {
    title: 'Arcadia OpenAPI',
    description: '开放应用程序接口',
    url: '/docs/openapi',
    icon: <TabIcon icon={<Shapes />} className="text-[#8b5cf6] dark:text-[#c4b5fd] max-md:bg-[#8b5cf6]/10 dark:max-md:bg-[#c4b5fd]/10" />,
  },
]

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, ...base } = baseOptions()
  return (
    <TabThemeProvider>
      <DocsLayout
        {...base}
        nav={{ ...nav, mode: 'top' }}
        tree={source.getPageTree()}
        sidebar={{ tabs: DocsTabs, collapsible: false }}
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
