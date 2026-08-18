'use client'
import { ConfigProvider, Image, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import BlurFade from '../BlurFade'
import styles from './index.module.css'
import { Safari } from './Safari'
import ThreeDMarquee from './TreeDMarquee'

// 着陆页已固定为深色主题，预览图统一使用深色版本。
const DARK_IMAGE_PATHS = [
  '/images/preview/code-edit-dark.png',
  '/images/preview/cron-dashboard-dark.png',
  '/images/preview/cron-config-dark.png',
  '/images/preview/daemon-dark.png',
  '/images/preview/log-dark.png',
  '/images/preview/config-env-dark.png',
  '/images/preview/config-dep-dark.png',
  '/images/preview/file-dark.png',
  '/images/preview/terminal-dark.png',
  '/images/preview/login-dark.png',
]

const marqueeIndices = [9, 1, 2, 4, 5, 7, 0, 6, 5, 4, 2, 1, 9, 3, 0, 4, 1, 5, 0, 7, 0, 8, 6, 2, 8, 1, 9, 1, 9, 2, 4, 5, 0, 7]

const darkMarqueeImgs = marqueeIndices.map(i => DARK_IMAGE_PATHS[i])

const previewTitle = '兼具美感与现代化的管理面板'

function ThreeDMarqueeComponents({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="mx-auto my-10 max-w-7xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-transparent p-2 ring-1 ring-neutral-700/10 cursor-pointer"
      onClick={onClick}
    >
      <ThreeDMarquee images={darkMarqueeImgs} />
    </div>
  )
}

function PreviewImageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }} locale={zhCN}>
      {children}
    </ConfigProvider>
  )
}

function PreviewImagesGroup() {
  return (
    <Image.PreviewGroup
      items={DARK_IMAGE_PATHS}
    >
      <Image src={DARK_IMAGE_PATHS[0]} />
    </Image.PreviewGroup>
  )
}

function PreviewContentDefault() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)
  return (
    <div className="w-full">
      <span className="text-neutral-600 dark:text-neutral-400 text-2xl font-bold tracking-tighter" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
        <BlurFade delay={0.25} inView>
          <span className="font-bold tracking-tighter">
            {previewTitle}
          </span>
        </BlurFade>
      </span>
      <div className="pt-4 lg:pt-0 w-full m-auto">
        <ThreeDMarqueeComponents onClick={() => { setVisible(true) }} />
        <PreviewImageContainer>
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{
                open: visible,
                current,
                onOpenChange: (vis) => { setVisible(vis) },
                onChange: (curr) => { setCurrent(curr) },
              }}
              items={DARK_IMAGE_PATHS}
            />
          </div>
        </PreviewImageContainer>
      </div>
    </div>
  )
}

function PreviewContentMobile() {
  return (
    <div className="w-full my-8">
      <div className="pt-4 lg:pt-0">
        <div className="relative">
          <Safari
            className="size-full"
          >
            <PreviewImageContainer>
              <PreviewImagesGroup />
            </PreviewImageContainer>
          </Safari>
        </div>
      </div>
      <span className="text-neutral-600 dark:text-neutral-400 text-base" style={{ paddingTop: '1rem', width: '100%', textAlign: 'center', display: 'block' }}>
        {previewTitle}
      </span>
    </div>

  )
}

export default function Preview() {
  const { isMobile } = useWindowSize()

  return (
    <div className="sm:py-12 bg-white dark:bg-neutral-950 border-neutral-100 dark:border-neutral-900 overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full justify-center flex"
        >
          <section className={clsx('w-full', styles.features)}>
            {!isMobile ? <PreviewContentDefault /> : <PreviewContentMobile />}
          </section>
        </motion.div>
      </div>
    </div>
  )
}
