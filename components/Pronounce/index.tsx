'use client'

import React, { useRef, useState } from 'react'
import { Icon } from '../Icon'

export default function Pronounce() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const play = () => {
    (audioRef.current as any).play()
  }

  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <span
      style={{
        borderRadius: '2px',
        color: isHover ? 'var(--fd-primary)' : 'var(--border)',
        padding: '0.2rem',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={play}
    >
      <Icon style={{ verticalAlign: '-0.15em' }}>
        line-md:volume-high
      </Icon>
      <audio src="/audio/arcadia.mp3" ref={audioRef} style={{ display: 'none' }}></audio>
    </span>
  )
}
