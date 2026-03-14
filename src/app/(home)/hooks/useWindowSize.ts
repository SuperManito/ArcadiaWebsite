'use client'
import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [width, setWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isMobile: width !== undefined && width < 768,
    isDesktop: width !== undefined && width >= 768,
    isSSR: width === undefined,
  }
}
