import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  BlogAuthors,
  BlogBackLink,
  BlogBody,
  BlogDate,
  BlogDescription,
  BlogHeader,
  BlogPage,
  BlogPostNav,
  BlogTags,
  BlogTitle,
} from '@/components/blog'
import { findPost, getPosts } from '@/lib/blog'
import { blogAuthors, blogSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params
  const page = blogSource.getPage([params.slug])
  if (!page)
    notFound()

  const found = findPost(getPosts(blogSource.getPages(), blogAuthors), page.url)
  if (!found)
    notFound()

  const { post, newer, older } = found
  const MdxContent = page.data.body

  return (
    <BlogPage toc={page.data.toc}>
      <BlogHeader>
        <BlogBackLink href="/blog">返回博客</BlogBackLink>
        <BlogTitle>{post.title}</BlogTitle>
        <BlogDescription>{post.description}</BlogDescription>
        <div className="flex flex-row flex-wrap items-center gap-4">
          <BlogAuthors authors={post.authors} />
          {post.date && (
            <BlogDate date={post.date} className="ms-auto text-sm text-fd-muted-foreground" />
          )}
        </div>
        <BlogTags tags={post.tags} />
      </BlogHeader>
      <BlogBody>
        <MdxContent components={getMDXComponents()} />
      </BlogBody>
      <BlogPostNav newer={newer} older={older} />
    </BlogPage>
  )
}

export function generateStaticParams() {
  return blogSource.getPages().map(page => ({ slug: page.slugs.join('/') }))
}

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const params = await props.params
  const page = blogSource.getPage([params.slug])
  if (!page)
    notFound()

  return {
    title: `${page.data.title} | Arcadia`,
    description: page.data.description,
  }
}
