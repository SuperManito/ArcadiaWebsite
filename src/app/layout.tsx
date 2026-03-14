import type { Metadata } from 'next'
import { Banner } from 'fumadocs-ui/components/banner'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Provider } from '@/components/provider'

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
        'rgba(0, 149, 255, 0.56)',
        'rgba(231, 77, 255, 0.77)',
        'rgba(255, 0, 0, 0.73)',
        'rgba(131, 255, 166, 0.66)',
        'rgba(0, 149, 255, 0.56)',
      ]}
    >
      🎉 Arcadia 1.0.0-beta.8（现已发布）
    </Banner>
  )
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <BannerComponent />
        <Provider>{children}</Provider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
