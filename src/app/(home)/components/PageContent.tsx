'use client'
import { useEffect } from 'react'
import EcosystemSection from './Ecosystem'
import FeatureGrid from './FeatureGrid'
import Footer from './Footer'
import HeroSection from './Hero'
import LanguageShowcase from './LanguageShowcase'
import PreviewSection from './Preview'
import ScrollFeaturesSection from './ScrollFeatures'

export default function HomePageContent() {
  useEffect(() => {
    // The landing page is permanently dark, but the root element keeps the
    // default light color-scheme. Align it so scrollbars and overscroll
    // bounce render dark instead of flashing white while scrolling.
    const root = document.documentElement
    const previousScheme = root.style.colorScheme
    const previousBackground = root.style.backgroundColor
    root.style.colorScheme = 'dark'
    root.style.backgroundColor = '#0a0a0a'
    return () => {
      root.style.colorScheme = previousScheme
      root.style.backgroundColor = previousBackground
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950">
      <HeroSection />
      <ScrollFeaturesSection />
      <EcosystemSection />
      <LanguageShowcase />
      <PreviewSection />
      <FeatureGrid />
      <Footer />
    </div>
  )
}
