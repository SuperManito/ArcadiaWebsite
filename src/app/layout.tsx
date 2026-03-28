import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Provider } from '@/components/provider'
import { releaseNotice } from '@/lib/layout.shared'

import './global.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://arcadia.cool'),
  title: 'Arcadia',
  description: '一站式代码自动化运维平台',
  applicationName: 'Arcadia',
  authors: {
    name: 'SuperManito',
    url: 'https://github.com/SuperManito',
  },
  openGraph: {
    title: 'Arcadia',
    description: '一站式代码自动化运维平台',
    url: 'https://arcadia.cool',
    siteName: 'Arcadia',
    images: [
      { url: '/og-home.png', width: 1200, height: 630, alt: 'Arcadia 首页' },
    ],
  },
}

const inter = Inter({
  subsets: ['latin'],
})

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex flex-col min-h-screen">
        <Banner>{releaseNotice}</Banner>
        <Provider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  )
}
