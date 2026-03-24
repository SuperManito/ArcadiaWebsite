import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  allowedDevOrigins: process.env.NODE_ENV === 'development'
    ? [
        '192.168.*.*',
        '10.*.*.*',
        '172.16.*.*',
      ]
    : [],
  serverExternalPackages: ['@takumi-rs/image-response'],
  // output: 'export', // 静态导出模式
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ]
  },
}

export default withMDX(config)
