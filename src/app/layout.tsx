import type { Metadata } from 'next'
import { Banner } from 'fumadocs-ui/components/banner'
import { Inter } from 'next/font/google'
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
}

const inter = Inter({
  subsets: ['latin'],
})

function BannerComponent() {
  return (
    <Banner
      id="release-notice"
      variant="rainbow"
      rainbowColors={[
        'rgba(0, 132, 220, 0.56)',
        'rgba(0, 144, 174, 0.77)',
        'rgba(157, 254, 189, 0.73)',
      ]}
    >
      {releaseNotice}
    </Banner>
  )
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex flex-col min-h-screen">
        <BannerComponent />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
