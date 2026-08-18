'use client'
import type { Variants } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from '../Link'
import PixelGrid from './PixelGrid'
import ProductShot from './ProductShot'

const easeOut = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  }

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: easeOut },
    },
  }

  return (
    <section className="relative isolate  min-h-[calc(100vh+57px)] w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(72%_58%_at_34%_-12%,rgba(37,99,235,0.09),transparent_64%),radial-gradient(56%_48%_at_88%_108%,rgba(37,99,235,0.05),transparent_66%)] mask-[linear-gradient(to_bottom,black_55%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_92%)]"
      />
      <PixelGrid className="z-1" />

      <div className="relative z-2 mx-auto grid min-h-[calc(100vh-57px-4rem)] w-full max-w-360 grid-cols-1 items-center px-6 py-12 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:gap-x-16 lg:px-10 lg:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.h1
            variants={item}
            className="text-[clamp(2.25rem,3.7vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em]"
          >
            <span className="block text-neutral-50">
              一站式
            </span>
            <span className="mt-2 block text-neutral-50">
              <span className="text-blue-400">代码自动化运维</span>
              平台
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-136 text-base leading-[1.8] text-neutral-400 sm:text-lg"
          >
            写脚本、跑定时任务、服务托管、消息聚合、AI Agent 运行基座，一个面板搞定全流程
          </motion.p>

          <motion.div variants={item} className="mt-8 flex items-center gap-6">
            <Link
              to="/docs/quick-start"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:translate-y-px"
            >
              快速开始
              <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex h-11 items-center rounded-lg px-1 text-sm font-medium text-neutral-400 transition-colors duration-150 hover:text-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              了解更多
            </Link>
          </motion.div>
        </motion.div>

        <ProductShot />
      </div>
    </section>
  )
}
