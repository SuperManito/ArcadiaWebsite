'use client'
import { motion } from 'motion/react'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import cn from '../../lib/utils'
import FeatureGrid from '../FeatureGrid'
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
              'bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-5 py-3 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors',
            )}
          >
            快速开始
          </Link>
          <Link
            to="/docs"
            className={cn(
              'rounded-lg px-5 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
            )}
          >
            了解更多
          </Link>
        </div>

        <FeatureGrid />
      </div>
    </Background>
  )
}
