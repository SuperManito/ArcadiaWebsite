import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogBackLink, BlogCards } from '@/components/blog'
import { getPosts, getTagPosts, getTags } from '@/lib/blog'
import { blogAuthors, blogSource } from '@/lib/source'

export default async function Page(props: PageProps<'/blog/tags/[tag]'>) {
  const params = await props.params
  const found = getTagPosts(getPosts(blogSource.getPages(), blogAuthors), params.tag)
  if (!found)
    notFound()

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <BlogBackLink href="/blog/tags">全部标签</BlogBackLink>
      <h1 className="text-2xl font-semibold">{found.tag.name}</h1>
      <BlogCards posts={found.posts} />
    </div>
  )
}

export function generateStaticParams() {
  return getTags(getPosts(blogSource.getPages(), blogAuthors)).map(tag => ({ tag: tag.slug }))
}

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/blog/tags/[tag]'>): Promise<Metadata> {
  const params = await props.params
  const found = getTagPosts(getPosts(blogSource.getPages(), blogAuthors), params.tag)
  if (!found)
    notFound()

  return {
    title: `${found.tag.name} | 博客 | Arcadia`,
  }
}
