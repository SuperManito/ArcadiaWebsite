'use client'
import { motion } from 'motion/react'
import React from 'react'
import { gitConfig } from '@/lib/layout.shared'
import { useTheme } from '../../hooks/useTheme'
import cn from '../../lib/utils'
import FeatureGrid from '../FeatureGrid'
import { Icon } from '../Icon'
import Link from '../Link'
import AuroraText from './AuroraText'
import DarkVeil from './DarkVeil'

function Background({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) {
  const { isDark } = useTheme()
  const hueShift = isDark ? 32 : 40

  return (
    <div
      className={cn(
        'relative min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-44px)] w-full h-full flex items-center justify-center overflow-hidden',
        containerClassName,
      )}
    >
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={hueShift}
          speed={1.5}
          warpAmount={0}
        />
      </div>

      <div className={cn('relative z-20', className)}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: [20, -5, 0] }} transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <Background
      containerClassName="pt-[80px] pb-[60px] lg:pt-[120px] lg:pb-[100px]"
    >
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-5 mb-10 sm:mb-14">
          <div className="text-[3rem] md:text-[4.5rem] font-bold tracking-tight pb-1 select-none">
            <AuroraText>Arcadia</AuroraText>
          </div>
          <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100 pb-2">
            一站式代码自动化运维平台
          </div>
          <div className="pt-3 sm:pt-5 text-sm sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-2 leading-relaxed">
            提供强大的定时任务调度、代码编辑调试、运行日志管理等功能，让运维变得简单高效。
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-20 h-16">
          <Link
            to="/docs/quick-start"
            className={cn(
              'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30',
              'px-2 py-1 h-12 md:h-full md:px-8 md:py-4 rounded-3xl md:rounded-4xl font-semibold text-sm sm:text-lg transition-colors flex items-center justify-center flex-1 max-w-28 md:max-w-35 sm:flex-none sm:w-auto',
            )}
          >
            开始使用
          </Link>
          <Link
            href={gitConfig.url}
            className={cn(
              'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 gap-2 text-center',
              'px-2 py-1 h-12 md:h-full md:px-8 md:py-4 rounded-3xl md:rounded-4xl font-semibold text-sm sm:text-lg transition-colors flex items-center justify-center flex-1 max-w-28 md:max-w-35 sm:flex-none sm:w-auto',
            )}
          >
            <Icon icon="mdi:github" />
            GitHub
          </Link>
        </div>

        <FeatureGrid />
      </div>
    </Background>
  )
}
