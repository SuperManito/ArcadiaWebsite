import type { Metadata } from 'next'
import Link from 'fumadocs-core/link'
import { BlogCards } from '@/components/blog'
import { getBlogUrl, getPosts } from '@/lib/blog'
import { blogAuthors, blogSource } from '@/lib/source'

export default function Page() {
  const posts = getPosts(blogSource.getPages(), blogAuthors)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-2xl font-semibold">博客</h1>
        <Link
          href={getBlogUrl(['tags'])}
          className="ms-auto text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground"
        >
          全部标签
        </Link>
      </div>
      <BlogCards posts={posts} />
    </div>
  )
}

export const metadata: Metadata = {
  title: '博客 | Arcadia',
  description: 'Arcadia 更新与使用说明',
}
