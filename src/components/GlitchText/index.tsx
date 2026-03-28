'use client'

import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

interface GlitchTextProps {
  children: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [frame, setFrame] = useState(0)

  const clipPaths = [
    'inset(10% 0 85% 0)',
    'inset(45% 0 40% 0)',
    'inset(80% 0 5% 0)',
    'inset(10% 0 60% 0)',
    'inset(70% 0 20% 0)',
    'inset(25% 0 50% 0)',
    'inset(55% 0 35% 0)',
    'inset(5% 0 75% 0)',
    'inset(90% 0 2% 0)',
    'inset(30% 0 55% 0)',
    'inset(15% 0 70% 0)',
    'inset(65% 0 25% 0)',
    'inset(40% 0 45% 0)',
    'inset(85% 0 10% 0)',
    'inset(20% 0 65% 0)',
    'inset(50% 0 30% 0)',
    'inset(75% 0 15% 0)',
    'inset(35% 0 52% 0)',
    'inset(60% 0 28% 0)',
    'inset(8% 0 82% 0)',
  ]

  const shouldAnimate = enableOnHover ? isHovered : true

  useEffect(() => {
    if (!shouldAnimate) {
      return
    }

    const intervalMs = (speed * 1000) / clipPaths.length
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % clipPaths.length)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [shouldAnimate, speed, clipPaths.length])

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    userSelect: 'none',
  }

  const textStyle: React.CSSProperties = {
    position: 'relative',
    fontSize: 'clamp(2rem, 10vw, 8rem)',
    fontWeight: 900,
  }

  const layerBaseStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: 'clamp(2rem, 10vw, 8rem)',
    fontWeight: 900,
    overflow: 'hidden',
  }

  const afterIndex = frame
  const beforeIndex = (frame + 10) % clipPaths.length

  const showLayers = enableOnHover ? isHovered : true

  const afterStyle: React.CSSProperties = {
    ...layerBaseStyle,
    left: '10px',
    textShadow: enableShadows ? '-5px 0 red' : 'none',
    clipPath: showLayers ? clipPaths[afterIndex] : 'inset(0 0 100% 0)',
    opacity: showLayers ? 1 : 0,
    transition: 'opacity 0.1s',
  }

  const beforeStyle: React.CSSProperties = {
    ...layerBaseStyle,
    left: '-10px',
    textShadow: enableShadows ? '5px 0 cyan' : 'none',
    clipPath: showLayers ? clipPaths[beforeIndex] : 'inset(0 0 100% 0)',
    opacity: showLayers ? 1 : 0,
    transition: 'opacity 0.1s',
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
      role="button"
      tabIndex={0}
      style={containerStyle}
    >
      <span style={textStyle}>{children}</span>
      <span className="text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-950" aria-hidden="true" style={beforeStyle}>
        404
      </span>
      <span className="text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-950" aria-hidden="true" style={afterStyle}>
        404
      </span>
    </div>
  )
}

export default GlitchText
