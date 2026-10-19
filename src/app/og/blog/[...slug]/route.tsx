import { generateOGImage } from 'fumadocs-ui/og'
import { notFound } from 'next/navigation'
import { blogSource, getBlogImageUrl } from '@/lib/source'

export const revalidate = false

export async function GET(_req: Request, { params }: RouteContext<'/og/blog/[...slug]'>) {
  const { slug } = await params
  const page = blogSource.getPage(slug.slice(0, -1))
  if (!page)
    notFound()

  return generateOGImage({
    title: page.data.title,
    primaryColor: '#536dfe',
    primaryTextColor: '#000',
    description: page.data.description,
    icon: <img src="https://arcadia.cool/images/logo/arcadia-dark-sub.png" alt="Arcadia Logo" height={48} />,
  })
}

export function generateStaticParams(): { slug: string[] }[] {
  return blogSource.getPages().map(page => ({
    slug: getBlogImageUrl(page).segments,
  }))
}
