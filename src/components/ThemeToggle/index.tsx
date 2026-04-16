'use client'
import type { ComponentProps, MouseEvent, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from 'fumadocs-ui/provider/base'
import { Airplay, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const itemVariants = cva('size-6.5 rounded-full p-1.5 text-fd-muted-foreground', {
  variants: {
    active: {
      true: 'bg-fd-accent text-fd-accent-foreground',
      false: 'text-fd-muted-foreground',
    },
  },
})

const full = [['light', Sun] as const, ['dark', Moon] as const, ['system', Airplay] as const]

export function ThemeToggle({
  className,
  ...props
}: ComponentProps<'div'> & {
  mode?: 'light-dark' | 'light-dark-system'
}): ReactNode {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const container = cn('inline-flex items-center rounded-full border p-1', className)

  const value = mounted ? theme : null

  const handleClick = (key: string) => (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    const { top, left, width, height } = target.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const vw = window.visualViewport?.width ?? window.innerWidth
    const vh = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))

    if (typeof document.startViewTransition !== 'function') {
      setTheme(key)
      return
    }

    const transition = document.startViewTransition(() => {
      setTheme(key)
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === 'function') {
      ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 420,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
    }
  }

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {full.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(
            itemVariants({ active: value === key }),
            'hover:bg-fd-accent transition-colors cursor-pointer duration-150',
          )}
          onClick={handleClick(key)}
        >
          <Icon className="size-full" fill="currentColor" />
        </button>
      ))}
    </div>
  )
}
