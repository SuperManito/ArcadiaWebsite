import type { Metadata } from 'next'
import Link from 'fumadocs-core/link'
import { findSiblings } from 'fumadocs-core/page-tree'
import { PathUtils } from 'fumadocs-core/source'
import { Card, Cards } from 'fumadocs-ui/components/card'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
} from 'fumadocs-ui/layouts/notebook/page'
import { notFound } from 'next/navigation'
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions'
import { OpenAPIPage } from '@/components/APIPage'
import ClientFade from '@/components/ClientFade'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/HoverCard'
import { gitConfig } from '@/lib/layout.shared'
import { openapi } from '@/lib/openapi'
import { getPageImageUrl, source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page)
    notFound()

  const MdxContent = page.data.body
  // const lastModifiedTime = await getGithubLastEdit({
  //   owner: gitConfig.user,
  //   repo: gitConfig.docRepo,
  //   path: `docs/${page.path}`,
  // })
  const markdownUrl = `/llms.mdx/docs/${[...page.slugs, 'index.mdx'].join('/')}`

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }}>
      <div className="flex items-center justify-between">
        <DocsTitle>{page.data.title}</DocsTitle>
        <div className="flex flex-row gap-2 items-center">
          <LLMCopyButton markdownUrl={markdownUrl} />
          <ViewOptions
            markdownUrl={markdownUrl}
            githubUrl={`${gitConfig.docUrl}/blob/${gitConfig.docBranch}/docs/${page.path}`}
          />
        </div>
      </div>
      <DocsDescription className="mb-0 text-fd-muted-foreground">{page.data.description}</DocsDescription>
      <DocsBody>
        <ClientFade>
          <MdxContent
            components={getMDXComponents({
              a({ href, ...props }) {
                const found = source.getPageByHref(href ?? '', {
                  dir: PathUtils.dirname(page.path),
                })
                if (!found)
                  return <Link href={href} {...props} />
                return (
                  <HoverCard>
                    <HoverCardTrigger
                      href={found.hash ? `${found.page.url}#${found.hash}` : found.page.url}
                      {...props}
                    >
                      {props.children}
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      <p className="font-medium">{found.page.data.title}</p>
                      <p className="text-fd-muted-foreground">{found.page.data.description}</p>
                    </HoverCardContent>
                  </HoverCard>
                )
              },
              DocsCategory: ({ url }) => {
                return <DocsCategory url={url ?? page.url} />
              },
              OpenAPIPage: async props => (
                <OpenAPIPage {...await openapi.preloadOpenAPIPage(page)} {...props} />
              ),
            })}
          />
        </ClientFade>
      </DocsBody>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm">
        {/* {lastModifiedTime && (
          <PageLastUpdate
            date={lastModifiedTime}
          />
        )} */}
        <EditOnGitHub
          href={`${gitConfig.docUrl}/edit/${gitConfig.docBranch}/docs/${page.path}`}
        />
      </div>
    </DocsPage>
  )
}

function DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {findSiblings(source.getPageTree(), url).map((item) => {
        if (item.type === 'separator')
          return undefined
        if (item.type === 'folder') {
          if (!item.index)
            return undefined
          item = item.index
        }

        return (
          <Card key={item.url} title={item.name} href={item.url}>
            {item.description}
          </Card>
        )
      })}
    </Cards>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page)
    notFound()

  return {
    title: `${page.data.title} | Arcadia`,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  }
}
