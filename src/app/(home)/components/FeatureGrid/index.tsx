'use client'
import type { FeatureItem } from './data'
import { motion } from 'motion/react'
import React from 'react'
import { Icon } from '../Icon'
import { features } from './data'

export default function FeatureGrid() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current)
      return
    const cards = containerRef.current.querySelectorAll('.feature-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
      const borderOpacity = Math.max(0, 1 - distance / 400)

      ;(card as HTMLDivElement).style.setProperty('--x', `${x}px`)
      ;(card as HTMLDivElement).style.setProperty('--y', `${y}px`)
      ;(card as HTMLDivElement).style.setProperty('--border-opacity', borderOpacity.toString())
    })
  }

  const handleMouseLeave = () => {
    if (!containerRef.current)
      return
    const cards = containerRef.current.querySelectorAll('.feature-card')
    cards.forEach((card) => {
      ;(card as HTMLDivElement).style.setProperty('--border-opacity', '0')
    })
  }

  return (
    <section id="capabilities" className="relative overflow-hidden bg-white dark:bg-neutral-950 py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neutral-700/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_42%_at_50%_20%,rgba(37,99,235,0.06),transparent_70%)]"
      />
      <div className="relative container mx-auto px-4 max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
            能力全景
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            从脚本编写到定时调度，从守护进程到消息聚合，Arcadia 覆盖代码运维的每一个环节
          </p>
        </div>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mt-6 sm:mt-10 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3 text-left max-w-7xl mx-auto relative group/grid"
        >
          {features.map((feature, index) => {
            return (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureItem
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="feature-card relative rounded-xl sm:rounded-2xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm p-3 sm:p-5 overflow-hidden group/card"
    >
      {/* 边框高亮 */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-xl sm:rounded-2xl"
        style={{
          opacity: 'var(--border-opacity, 0)',
          background: 'radial-gradient(600px circle at var(--x, 0) var(--y, 0), rgba(100,150,255,0.15), transparent 40%)',
          boxShadow: 'inset 0 0 0 1px rgba(100,150,255, 0.3)',
        }}
      />

      {/* 内部聚光灯 (仅悬浮时可见) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(400px circle at var(--x, 0) var(--y, 0), rgba(200,225,255,0.1) 0%, transparent 100%)',
        }}
      />

      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 sm:mb-4 group-hover/card:scale-110 transition-transform relative z-10 border border-blue-100/30 dark:border-blue-800/30">
        <div className="scale-75 sm:scale-100 flex items-center justify-center">
          <Icon icon={feature.icon} size={32} />
        </div>
      </div>
      <div className="text-sm sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5 sm:mb-3 relative z-10 drop-shadow-sm">
        {feature.title}
      </div>
      <div className="text-neutral-600 dark:text-neutral-400 text-[11px] sm:text-[13px] leading-snug sm:leading-relaxed relative z-10 line-clamp-3 sm:line-clamp-none">
        {feature.description}
      </div>
    </motion.div>
  )
}
