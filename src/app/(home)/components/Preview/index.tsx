'use client'
import { ConfigProvider, Image, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useWindowSize } from '../../hooks/useWindowSize'
import BlurFade from '../BlurFade'
import styles from './index.module.css'
import Safari from './Safari'
import ThreeDMarquee from './TreeDMarquee'

// 静态资源路径（相对于 /static 目录）
const LIGHT_IMAGE_PATHS = [
  '/images/preview/code-edit-light.png',
  '/images/preview/cron-dashboard-light.png',
  '/images/preview/cron-config-light.png',
  '/images/preview/log-light.png',
  '/images/preview/env-light.png',
  '/images/preview/file-light.png',
  '/images/preview/terminal-light.png',
  '/images/preview/login-light.png',
]

const DARK_IMAGE_PATHS = [
  '/images/preview/code-edit-dark.png',
  '/images/preview/cron-dashboard-dark.png',
  '/images/preview/cron-config-dark.png',
  '/images/preview/log-dark.png',
  '/images/preview/env-dark.png',
  '/images/preview/file-dark.png',
  '/images/preview/terminal-dark.png',
  '/images/preview/login-dark.png',
]

const marqueeIndices = [7, 1, 2, 3, 4, 5, 0, 5, 4, 3, 2, 1, 7, 2, 0, 3, 1, 4, 0, 5, 0, 5, 4, 2, 5, 1, 7, 1, 7, 2, 3, 4, 0, 5]

const lightMarqueeImgs = marqueeIndices.map(i => LIGHT_IMAGE_PATHS[i])
const darkMarqueeImgs = marqueeIndices.map(i => DARK_IMAGE_PATHS[i])

function ThreeDMarqueeComponents({ onClick }: { onClick?: () => void }) {
  const { isDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const images = mounted && isDark ? darkMarqueeImgs : lightMarqueeImgs
  return (
    <div
      className="mx-auto my-10 max-w-7xl rounded-3xl border-4 border-neutral-200 dark:border-neutral-800 bg-transparent p-2 ring-1 ring-neutral-700/10 cursor-pointer"
      onClick={onClick}
    >
      <ThreeDMarquee images={images} />
    </div>
  )
}

function PreviewImageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme: currentTheme } = useTheme()
  const algorithm = useMemo(() => {
    return currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [currentTheme])
  return (
    <ConfigProvider theme={{ algorithm }} locale={zhCN}>
      {children}
    </ConfigProvider>
  )
}

function PreviewImagesGroup() {
  const { isDark } = useTheme()
  const [previewImg, setPreviewImg] = useState(LIGHT_IMAGE_PATHS[0])
  const [previewImgs, setPreviewImgs] = useState<string[]>(LIGHT_IMAGE_PATHS)
  useEffect(() => {
    setPreviewImg(isDark ? DARK_IMAGE_PATHS[0] : LIGHT_IMAGE_PATHS[0])
    setPreviewImgs(isDark ? DARK_IMAGE_PATHS : LIGHT_IMAGE_PATHS)
  }, [isDark])
  return (
    <Image.PreviewGroup
      items={previewImgs}
    >
      <Image src={previewImg} />
    </Image.PreviewGroup>
  )
}

function PreviewContentDefault() {
  const { isDark } = useTheme()
  const [previewImgs, setPreviewImgs] = useState<string[]>(LIGHT_IMAGE_PATHS)
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    setPreviewImgs(isDark ? DARK_IMAGE_PATHS : LIGHT_IMAGE_PATHS)
  }, [isDark])
  const [visible, setVisible] = useState(false)
  return (
    <div className="w-full">
      <span className="text-neutral-600 dark:text-neutral-400 text-2xl font-bold tracking-tighter" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
        <BlurFade delay={0.25} inView>
          <span className="font-bold tracking-tighter">
            兼具美感与现代化的控制面板
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
              items={previewImgs}
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
        兼具美感与现代化的控制面板
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
