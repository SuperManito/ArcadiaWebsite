'use client'
import { useEffect, useState } from 'react'
import BlurFade from '../BlurFade'
import CapabilityCards from './CapabilityCards'
import { fileExtensions } from './data'
import LanguageLogos from './LanguageLogos'
import TypewriterEffect from './TypewriterEffect'

export default function CliShowcase() {
  const [fileType, setFileType] = useState(fileExtensions[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const delay = 2000
    const startInterval = () => {
      const interval = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % fileExtensions.length)
      }, 2000)
      return () => clearInterval(interval)
    }
    const timeout = setTimeout(startInterval, delay)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    setFileType(fileExtensions[index])
  }, [index])

  const words = [
    {
      text: 'arcadia',
    },
    {
      text: 'run',
    },
    {
      text: `script.${fileType}`.padEnd(10, ' '),
      className: 'text-blue-500 dark:text-blue-400',
    },
  ]

  return (
    <div className="relative overflow-hidden py-12 sm:py-24 bg-white dark:bg-neutral-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(48%_42%_at_50%_46%,rgba(37,99,235,0.07),transparent_70%)]"
      />
      <section className="relative container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-64 lg:h-full rounded-2xl">
          <div className="mt-8 md:mt-16 md:mb-16 text-neutral-500 dark:text-neutral-400 text-center">
            <BlurFade delay={0.25} inView>
              <div className="text-neutral-900 dark:text-white font-bold tracking-tighter text-[1.4rem] md:text-[2.5rem] inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M6.5 21q-1.45 0-2.475-1.025T3 17.5t1.025-2.475T6.5 14H8v-4H6.5q-1.45 0-2.475-1.025T3 6.5t1.025-2.475T6.5 3t2.475 1.025T10 6.5V8h4V6.5q0-1.45 1.025-2.475T17.5 3t2.475 1.025T21 6.5t-1.025 2.475T17.5 10H16v4h1.5q1.45 0 2.475 1.025T21 17.5t-1.025 2.475T17.5 21t-2.475-1.025T14 17.5V16h-4v1.5q0 1.45-1.025 2.475T6.5 21m0-2q.625 0 1.063-.437T8 17.5V16H6.5q-.625 0-1.062.438T5 17.5t.438 1.063T6.5 19m11 0q.625 0 1.063-.437T19 17.5t-.437-1.062T17.5 16H16v1.5q0 .625.438 1.063T17.5 19M10 14h4v-4h-4zM6.5 8H8V6.5q0-.625-.437-1.062T6.5 5t-1.062.438T5 6.5t.438 1.063T6.5 8M16 8h1.5q.625 0 1.063-.437T19 6.5t-.437-1.062T17.5 5t-1.062.438T16 6.5z" />
                </svg>
                <span>强大的 CLI，无与伦比</span>
              </div>
            </BlurFade>
            <BlurFade delay={0.25 * 3} inView className="mt-2 md:mt-4">
              <span className="text-neutral-600 dark:text-neutral-400 tracking-tighter text-[.9rem] md:text-[1.1rem] block">一键运行代码文件，支持多种主流编程语言</span>
            </BlurFade>
          </div>
          <div className="w-54 md:w-125">
            <TypewriterEffect words={words} />
          </div>
          <LanguageLogos />
          <CapabilityCards />
        </div>
      </section>
    </div>
  )
}
