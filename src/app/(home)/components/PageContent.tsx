'use client'
import EcosystemSection from './Ecosystem'
import Footer from './Footer'
import HeroSection from './Hero'
import LanguageShowcase from './LanguageShowcase'
import PreviewSection from './Preview'
import ScrollFeaturesSection from './ScrollFeatures'

export default function HomePageContent() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950">
      <HeroSection />
      <PreviewSection />
      <LanguageShowcase />
      <ScrollFeaturesSection />
      <EcosystemSection />
      <Footer />
    </div>
  )
}
