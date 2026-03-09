'use client'
import { useTheme as useNextTheme } from 'next-themes'

export function useTheme () {
  const { resolvedTheme, setTheme } = useNextTheme()
  return {
    isDark: resolvedTheme === 'dark',
    theme: resolvedTheme,
    setTheme,
  }
}
