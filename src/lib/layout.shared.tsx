import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared'
import Link from 'fumadocs-core/link'
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar'
import { BookOpen, Plug, Shapes, Terminal } from 'lucide-react'

export const releaseNotice = '📢 Release 1.2.0（2026-10-19）现已推出'

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'SuperManito',
  repo: 'Arcadia',
  branch: 'main',
  docRepo: 'ArcadiaWebsite',
  docBranch: 'main',
  url: 'https://github.com/SuperManito/Arcadia',
  docUrl: 'https://github.com/SuperManito/ArcadiaWebsite',
}

export const socialLinks: LinkItemType[] = [
  {
    type: 'icon',
    label: 'Telegram',
    text: 'Telegram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><path fill="currentColor" d="M41.42 7.309s3.885-1.515 3.56 2.164c-.107 1.515-1.078 6.818-1.834 12.553l-2.59 16.99s-.216 2.489-2.159 2.922c-1.942.432-4.856-1.515-5.396-1.948c-.432-.325-8.094-5.195-10.792-7.575c-.756-.65-1.62-1.948.108-3.463L33.649 18.13c1.295-1.3 2.59-4.33-2.806-.65l-15.11 10.28s-1.727 1.083-4.964.109l-7.016-2.165s-2.59-1.623 1.835-3.246c10.793-5.086 24.068-10.28 35.831-15.15" /></svg>
    ),
    url: 'https://t.me/ArcadiaPanel',
  },
]

export const Logo = (
  <div>
    <img
      src="/images/logo/arcadia-light-sub.png"
      className="block dark:hidden select-none"
      alt="Arcadia"
      width={110}
      draggable={false}
    />
    <img
      src="/images/logo/arcadia-dark-sub.png"
      className="hidden dark:block select-none"
      alt="Arcadia"
      width={110}
      draggable={false}
    />
  </div>
)

function TabIcon({ icon, className }: { icon: React.ReactNode, className?: string }) {
  return (
    <div
      className={`[&_svg]:size-full rounded-lg size-full max-md:border max-md:p-1.5 ${className}`}
    >
      {icon}
    </div>
  )
}

export const DocsTabs = [
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

export function homeLinks(): LinkItemType[] {
  return [
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
    ...socialLinks,
    {
      type: 'custom',
      on: 'nav',
      children: (
        <NavbarMenu>
          <NavbarMenuTrigger>
            <Link href="/docs">文档</Link>
          </NavbarMenuTrigger>
          <NavbarMenuContent>
            <NavbarMenuLink href="/docs" className="md:row-span-2">
              <BookOpen className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
              <p className="font-medium">入门指引</p>
              <p className="text-fd-muted-foreground text-sm">
                了解如何部署并使用 Arcadia 平台
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
    {
      type: 'main',
      text: '博客',
      url: '/blog',
    },
    {
      type: 'main',
      text: '更新日志',
      url: '/docs/changelog',
    },
    {
      type: 'main',
      text: '社区',
      url: 'https://t.me/ArcadiaPanelGroup',
      external: true,
    },
  ]
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: Logo,
    },
    githubUrl: gitConfig.url,
    links: socialLinks,
  }
}
