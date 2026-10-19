import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { ThemeToggle } from '@/components/ThemeToggle'
import { gitConfig, homeLinks, Logo } from '@/lib/layout.shared'

export default function Layout({ children }: LayoutProps<'/blog'>) {
  return (
    <HomeLayout
      nav={{
        title: Logo,
      }}
      themeSwitch={{
        component: <ThemeToggle />,
      }}
      githubUrl={gitConfig.url}
      links={homeLinks()}
      className="theme-blue"
    >
      {children}
    </HomeLayout>
  )
}
