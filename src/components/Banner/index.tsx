'use client'

import { useTranslations } from '@fuma-translate/react'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { releaseNotice } from '@/lib/layout.shared'

const bannerId = 'release-notice'
const height = '3rem'
const storageKey = 'arcadia-release-notice'
const hiddenClass = 'release-notice-hidden'
const rainbowColors = [
  'rgba(0, 132, 220, 0.56)',
  'rgba(0, 144, 174, 0.77)',
  'rgba(157, 254, 189, 0.73)',
]

const maskImage
  = 'linear-gradient(to bottom,white,transparent), radial-gradient(circle at top center, white, transparent)'

/**
 * 新版本发布提醒。本地记录缺失时只写入当前版本作为基线而不展示，
 * 记录与 `releaseNotice.version` 不一致时才出现，关闭后写入当前版本。
 */
export default function Banner() {
  const t = useTranslations({ note: 'banner' })
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (localStorage.getItem(storageKey) === releaseNotice.version)
      setOpen(false)
  }, [])

  function onClose() {
    setOpen(false)
    localStorage.setItem(storageKey, releaseNotice.version)
  }

  if (!open)
    return null

  const prePaintScript = [
    `var seen = localStorage.getItem('${storageKey}')`,
    `if (seen === null) localStorage.setItem('${storageKey}', '${releaseNotice.version}')`,
    `if (localStorage.getItem('${storageKey}') === '${releaseNotice.version}')`,
    `  document.documentElement.classList.add('${hiddenClass}')`,
  ].join('\n')

  return (
    <div
      id={bannerId}
      className={cn(
        'sticky top-0 z-40 flex flex-row items-center justify-center px-4 text-center text-sm font-medium',
        'bg-fd-background',
      )}
      style={{ height }}
    >
      {/* 首屏绘制前决定显隐，否则 banner 会先出现再收起并带动 --fd-banner-height 抖动 */}
      <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
      <style>
        {`
        :root:not(.${hiddenClass}) { --fd-banner-height: ${height}; }
        .${hiddenClass} #${bannerId} { display: none; }
      `}
      </style>
      <div
        className="absolute inset-0 -z-1"
        style={{
          maskImage,
          maskComposite: 'intersect',
          animation: 'fd-moving-banner 20s linear infinite',
          backgroundImage: `repeating-linear-gradient(70deg, ${[
            ...rainbowColors,
            rainbowColors[0],
          ].map((color, i) => `${color} ${i * 50 / rainbowColors.length}%`).join(', ')})`,
          backgroundSize: '200% 100%',
          filter: 'saturate(2)',
        }}
      />
      <style>
        {`@keyframes fd-moving-banner {
        from { background-position: 0% 0; }
        to { background-position: 100% 0; }
      }`}
      </style>
      {`📢 Release ${releaseNotice.version}（${releaseNotice.date}）现已推出`}
      <button
        type="button"
        aria-label={t('Close Banner', { note: 'aria-label' })}
        onClick={onClose}
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'absolute inset-e-2 top-1/2 -translate-y-1/2 text-fd-muted-foreground/50',
            size: 'icon-sm',
          }),
        )}
      >
        <X />
      </button>
    </div>
  )
}
