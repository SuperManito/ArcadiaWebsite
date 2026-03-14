import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'fumadocs-core/link'
import { cn } from '@/lib/cn'

export type TeamProfileCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  name: ReactNode
  username: string
  children: ReactNode
}

function TeamProfileCard({ name, children, username, ...props }: TeamProfileCardProps) {
  const url = `https://github.com/${username}`
  const avatarUrl = `${url}.png`
  return (
    <Link
      {...props}
      href={url}
      data-card
      className={cn(
        'flex flex-col rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full',
        url && 'hover:bg-fd-accent/80',
        props.className,
      )}
    >
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-center gap-4">
          <div className="shrink-0 not-prose flex items-center justify-center shadow-sm rounded-full border bg-fd-muted text-fd-muted-foreground w-8 h-8 overflow-hidden">
            <img className="w-full h-full object-cover" src={avatarUrl} alt={`${username}'s avatar`} />
          </div>
          <h3 className="not-prose text-base font-semibold">{name}</h3>
        </div>
        <p className="my-0! text-sm text-fd-muted-foreground flex-1">{children}</p>
      </div>
    </Link>
  )
}

export function TeamProfile() {
  return (
    <div className="grid grid-cols-2 gap-3 @container">
      <TeamProfileCard name="Super Manito" username="SuperManito">
        项目创始人，全栈开发者兼总设计师，不仅人长得帅敲代码也很厉害~
      </TeamProfileCard>
      <TeamProfileCard name="mzzsfy" username="mzzsfy">
        后端开发者，架构工程师。
      </TeamProfileCard>
    </div>
  )
}
