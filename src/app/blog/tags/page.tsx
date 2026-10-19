import type { Metadata } from 'next'
import { BlogTagCards } from '@/components/blog'
import { getPosts, getTags } from '@/lib/blog'
import { blogAuthors, blogSource } from '@/lib/source'

export default function Page() {
  const tags = getTags(getPosts(blogSource.getPages(), blogAuthors))

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">标签</h1>
      <BlogTagCards tags={tags} />
    </div>
  )
}

export const metadata: Metadata = {
  title: '博客标签 | Arcadia',
}
