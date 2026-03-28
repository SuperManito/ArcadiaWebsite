'use client'
import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { Airplay, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
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

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {full.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(itemVariants({ active: value === key }))}
          onClick={() => setTheme(key)}
        >
          <Icon className="size-full" fill="currentColor" />
        </button>
      ))}
    </div>
  )
}
