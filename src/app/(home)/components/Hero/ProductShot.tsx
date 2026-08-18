'use client'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { motion, useReducedMotion } from 'motion/react'

export default function ProductShot() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative w-full pb-24 md:pb-0">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_72px_-24px_rgba(59,130,246,0.32),0_40px_80px_-40px_rgba(0,0,0,0.9)]">
          <ImageZoom
            src="/images/home.png"
            rmiz={{ zoomMargin: 24 } as any}
            zoomInProps={{
              alt: 'Arcadia 沉浸式代码编辑器界面',
              className: 'rounded-lg border border-white/10 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]',
            }}
          >
            <img
              src="/images/home.png"
              alt="Arcadia 沉浸式代码编辑器界面"
              width={1920}
              height={1080}
              loading="eager"
              fetchPriority="high"
              draggable={false}
              className="block aspect-video w-full select-none object-cover object-[left_top] [mask-image:linear-gradient(to_bottom,black_58%,rgba(0,0,0,0.5)_82%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_58%,rgba(0,0,0,0.5)_82%,transparent_98%)]"
            />
          </ImageZoom>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        </div>
      </motion.div>
    </div>
  )
}
