'use client'
import type { ReactNode } from 'react'
import type { CliCapabilityItem } from './data'
import { motion } from 'motion/react'
import { cliCapabilities } from './data'

const FORK_PATHS = [
  'M24 95 H118',
  'M118 95 C158 95 158 42 198 42 H348',
  'M118 95 H348',
  'M118 95 C158 95 158 148 198 148 H348',
]

/** 并发：单条线路分叉为多条并行支线，短光束从左至右扫过 */
function ConcurrencyVisual() {
  return (
    <svg viewBox="0 0 400 190" fill="none" className="h-auto w-full" role="img" aria-label="并发执行示意图：一条线路分叉为三条并行支线">
      <defs>
        <linearGradient id="cli-sweep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="70" y2="0">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0" />
          <stop offset="0.5" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-70 0" to="400 0" dur="3s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="cli-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* 基础线路 */}
      <g stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round">
        {FORK_PATHS.map(d => <path key={d} d={d} />)}
      </g>

      {/* 高亮光晕（柔化） */}
      <g stroke="url(#cli-sweep)" strokeWidth="5" strokeLinecap="round" opacity="0.3" filter="url(#cli-blur)">
        {FORK_PATHS.map(d => <path key={d} d={d} />)}
      </g>

      {/* 高亮主线 */}
      <g stroke="url(#cli-sweep)" strokeWidth="2" strokeLinecap="round">
        {FORK_PATHS.map(d => <path key={d} d={d} />)}
      </g>

      {/* 起点与分叉点 */}
      <circle cx="24" cy="95" r="3" fill="#a1a1aa" />
      <circle cx="118" cy="95" r="3.5" fill="#60a5fa" />

      {/* 并行任务终点 */}
      {[[42, '0'], [95, '0.4s'], [148, '0.8s']].map(([y, delay]) => (
        <g key={y as number}>
          <circle cx="348" cy={y as number} r="8" fill="#3b82f6" opacity="0.25" className="animate-pulse" style={{ animationDelay: delay as string }} />
          <circle cx="348" cy={y as number} r="3.5" fill="#60a5fa" />
        </g>
      ))}
    </svg>
  )
}

/** 沙箱：带盾牌的容器盒 + 虚线隔离边界，外部访问被拦截 */
function SandboxVisual() {
  return (
    <svg viewBox="0 0 400 190" fill="none" className="h-auto w-full" role="img" aria-label="沙箱隔离示意图：带盾牌的容器盒被虚线边界包裹，外部访问被拦截">
      <defs>
        <radialGradient id="sandbox-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.14" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shield-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="96" rx="120" ry="64" fill="url(#sandbox-glow)" />

      {/* 隔离边界（缓慢流动的虚线） */}
      <rect x="86" y="22" width="228" height="146" rx="16" stroke="#52525b" strokeWidth="1" strokeDasharray="5 7">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite" />
      </rect>

      {/* 容器盒 */}
      <rect x="122" y="46" width="156" height="98" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />

      {/* 盾牌徽标 */}
      <circle cx="200" cy="100" r="30" fill="url(#shield-glow)" className="animate-pulse" />
      <path
        d="M200 74 L221 82 V99 C221 112.5 212.5 121.5 200 127 C187.5 121.5 179 112.5 179 99 V82 Z"
        fill="rgba(59,130,246,0.12)"
        stroke="#60a5fa"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M191 100.5 L197.5 107 L209 93" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* 被拦截的外部访问 */}
      <g stroke="#52525b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 70 H74" />
        <path d="M68 65 L74 70 L68 75" />
        <path d="M368 120 H326" />
        <path d="M332 115 L326 120 L332 125" />
        <path d="M200 187 V177" />
        <path d="M196 181 L200 176 L204 181" />
      </g>
      <g stroke="#f87171" strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
        <path d="M78 67 L84 73 M78 73 L84 67" />
        <path d="M316 117 L322 123 M316 123 L322 117" />
        <path d="M197 168 L203 174 M197 174 L203 168" />
      </g>
    </svg>
  )
}

const CAPABILITY_VISUALS: Record<CliCapabilityItem['key'], ReactNode> = {
  concurrency: <ConcurrencyVisual />,
  sandbox: <SandboxVisual />,
}

function CliCapabilityCard({
  title,
  tag,
  description,
  visual,
  delay = 0,
}: {
  title: string
  tag?: string
  description: string
  visual: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/40 backdrop-blur-xl transition-colors duration-300 hover:border-blue-400/40 dark:border-neutral-800/60 dark:bg-neutral-900/40 dark:hover:border-blue-500/25"
    >
      {/* 视觉区 */}
      <div className="relative px-5 pt-6 sm:px-7 sm:pt-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl transition-colors duration-500 group-hover:bg-blue-600/15"
        />
        <div className="relative rounded-xl border border-neutral-200/40 bg-neutral-100/40 px-3 py-4 sm:px-4 dark:border-neutral-800/50 dark:bg-neutral-950/50">
          {visual}
        </div>
      </div>

      {/* 文字区 */}
      <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-white">
            {title}
          </h3>
          {tag
            ? (
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] text-neutral-500 dark:border-neutral-700/60">
                  {tag}
                </span>
              )
            : null}
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/** CLI 能力卡片，宽度与上方语言 Logo 栏保持一致 */
export default function CapabilityCards() {
  return (
    <div className="mt-6 grid w-full grid-cols-1 gap-5 sm:gap-6 md:mt-8 lg:grid-cols-2">
      {cliCapabilities.map((capability, index) => (
        <CliCapabilityCard
          key={capability.key}
          title={capability.title}
          tag={capability.tag}
          description={capability.description}
          visual={CAPABILITY_VISUALS[capability.key]}
          delay={index * 0.12}
        />
      ))}
    </div>
  )
}
