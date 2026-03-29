import { notFound } from 'next/navigation'
import { getLLMText, source } from '@/lib/source'

export const revalidate = false

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  try {
    const { slug } = await params
    // remove the appended "index.mdx"
    const page = source.getPage(slug?.slice(0, -1))
    if (!page)
      notFound()

    return new Response(await getLLMText(page), {
      headers: {
        'Content-Type': 'text/markdown',
      },
    })
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return new Response(`Error fetching page content: ${e}`, { status: 500 })
  }
}

export function generateStaticParams() {
  return source.getPages().map(page => ({
    slug: [...page.slugs, 'index.mdx'],
  }))
}
