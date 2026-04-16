'use client'
import { useTheme as useAppTheme } from 'fumadocs-ui/provider/base'

export function useTheme() {
  const { resolvedTheme, setTheme } = useAppTheme()
  return {
    isDark: resolvedTheme === 'dark',
    theme: resolvedTheme,
    setTheme,
  }
}
