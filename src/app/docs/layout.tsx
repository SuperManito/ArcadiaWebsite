import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { BookOpen, Plug, Shapes, Terminal } from 'lucide-react'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

import { TabThemeProvider } from './theme-provider'

function TabIcon({ icon, color }: { icon: React.ReactNode, color: string }) {
  return (
    <div
      className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
      style={
        {
          '--tab-color': color,
        } as object
      }
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
    icon: <TabIcon icon={<BookOpen />} color="#14b8a6" />,
  },
  {
    title: 'Arcadia CLI',
    description: '命令行文档',
    url: '/docs/cli',
    icon: <TabIcon icon={<Terminal />} color="#0ea5e9" />,
  },
  {
    title: 'Arcadia API',
    description: '应用程序接口文档',
    url: '/docs/api',
    icon: <TabIcon icon={<Plug />} color="#f59e0b" />,
  },
  {
    title: 'Arcadia OpenAPI',
    description: '开放应用程序接口文档',
    url: '/docs/openapi',
    icon: <TabIcon icon={<Shapes />} color="#d946ef" />,
  },
]

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <TabThemeProvider>
      <DocsLayout
        tree={source.getPageTree()}
        {...baseOptions()}
        sidebar={{ tabs: DocsTabs }}
      >
        {children}
      </DocsLayout>
    </TabThemeProvider>
  )
}
