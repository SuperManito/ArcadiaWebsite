import Link from 'fumadocs-core/link'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar'
import { BookOpen, Plug, Shapes, Terminal } from 'lucide-react'
import { gitConfig, Logo, socialLinks } from '@/lib/layout.shared'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      nav={{
        title: (
          <>
            {Logo}
          </>
        ),
      }}
      githubUrl={gitConfig.url}
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: '文档',
          items: [
            {
              text: '入门指引',
              url: '/docs',
              icon: <BookOpen />,
            },
            {
              text: 'Arcadia CLI',
              url: '/docs/cli',
              icon: <Terminal />,
            },
            {
              text: 'Arcadia API',
              url: '/docs/api',
              icon: <Plug />,
            },
            {
              text: 'Arcadia OpenAPI',
              url: '/docs/openapi',
              icon: <Shapes />,
            },
          ],
        },
        ...socialLinks as any,
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger className="mt-1 px-2 py-1">
                <Link href="/docs">文档</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs" className="md:row-span-2">
                  <BookOpen className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">入门指引</p>
                  <p className="text-fd-muted-foreground text-sm">
                    了解如何完整部署并使用 Arcadia 平台
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/cli" className="lg:col-start-2">
                  <Terminal className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Arcadia CLI</p>
                  <p className="text-fd-muted-foreground text-sm">
                    命令行
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/api" className="lg:col-start-2">
                  <Plug className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Arcadia API</p>
                  <p className="text-fd-muted-foreground text-sm">
                    应用程序接口
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/openapi" className="lg:col-start-3 lg:row-start-1 md:row-span-2">
                  <Shapes className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Arcadia OpenAPI</p>
                  <p className="text-fd-muted-foreground text-sm">
                    开放应用程序接口
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
      ]}
      className="theme-blue dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
    </HomeLayout>
  )
}
