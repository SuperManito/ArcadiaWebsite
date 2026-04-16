'use client'

import { motion } from 'motion/react'
import React from 'react'

export default function ClientFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      {children}
    </motion.div>
  )
}
