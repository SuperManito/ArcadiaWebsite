import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { gitConfig, homeLinks, Logo } from '@/lib/layout.shared'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      nav={{
        title: Logo,
        transparentMode: 'always',
      }}
      themeSwitch={{
        enabled: false,
      }}
      githubUrl={gitConfig.url}
      links={homeLinks()}
      className="dark theme-blue bg-neutral-950 text-fd-foreground scheme-dark [--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
    </HomeLayout>
  )
}
