import Link from 'fumadocs-core/link'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/notebook/page'
import GlitchText from '@/components/GlitchText'
import { cn } from '@/lib/cn'
import { baseOptions, DocsTabs } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default function Layout() {
  const { nav, ...base } = baseOptions()
  return (
    <DocsLayout
      {...base}
      nav={{ ...nav, mode: 'top' }}
      tree={source.getPageTree()}
      sidebar={{ tabs: DocsTabs, collapsible: false }}
    >
      <DocsPage
        footer={{ enabled: false }}
        full={true}
        tableOfContent={{ enabled: false }}
        tableOfContentPopover={{ enabled: false }}
      >
        <DocsBody className="max-w-full">
          <div className="flex flex-col items-center justify-center text-primary overflow-hidden fixed inset-0">
            <GlitchText className="text-center">404</GlitchText>
            <p className="text-2xl font-semibold text-neutral-600 dark:text-neutral-400">
              您好像迷路了，我们找不到您要访问的页面
            </p>
            <Link
              href="/docs"
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  className: 'text-fd-muted-foreground rounded-2xl',
                }),
              )}
            >
              返回首页
            </Link>
          </div>
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
