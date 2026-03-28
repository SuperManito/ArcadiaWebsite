import { Banner } from 'fumadocs-ui/components/banner'

export default function BannerComponent({ children }: { children: React.ReactNode }) {
  return (
    <Banner
      id="release-notice"
      variant="rainbow"
      rainbowColors={[
        'rgba(0, 132, 220, 0.56)',
        'rgba(0, 144, 174, 0.77)',
        'rgba(157, 254, 189, 0.73)',
      ]}
    >
      {children}
    </Banner>
  )
}
