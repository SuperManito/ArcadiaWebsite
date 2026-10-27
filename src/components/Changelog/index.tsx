import type { ReactNode } from 'react'

function formatReleaseDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${year}年${Number(month)}月${Number(day)}日`
}

export function ChangelogEntry({ date, children }: { date: string, children?: ReactNode }) {
  return (
    <section className="changelog grid gap-x-6 gap-y-2 border-b border-fd-border py-8 first:pt-0 last:border-none last:pb-0 max-sm:pb-6 sm:grid-cols-[9.5rem_1fr]">
      <time
        dateTime={date}
        className="flex h-fit w-fit items-center rounded-full bg-fd-primary/10 px-2 py-2 text-sm leading-none font-semibold text-fd-primary whitespace-nowrap tabular-nums"
      >
        {formatReleaseDate(date)}
      </time>
      <div className="min-w-0 [&>*:first-child]:mt-0 [&>h2]:font-mono">
        {children}
      </div>
    </section>
  )
}
