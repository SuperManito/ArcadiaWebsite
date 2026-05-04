'use client'

import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { MessagesSquareIcon } from 'lucide-react'
import { AISearchTrigger } from '@/components/ai/search'
import { cn } from '@/lib/cn'

export default function AISearchLinkButton() {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPad|iPhone/.test(navigator.platform)

  return (
    <div className="hidden md:flex items-center gap-2">
      <AISearchTrigger
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'hidden shrink-0 shadow-none md:inline-flex items-center gap-2 h-8 group cursor-pointer',
        )}
      >
        <MessagesSquareIcon className="size-4 text-fd-muted-foreground group-hover:text-fd-accent-foreground" />
        <span>询问 AI</span>
        <div className="ms-auto inline-flex gap-0.5">
          <kbd className="rounded-md border bg-fd-background px-1.5 text-fd-muted-foreground group-hover:text-fd-accent-foreground">{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd className="rounded-md border bg-fd-background px-1.5 text-fd-muted-foreground group-hover:text-fd-accent-foreground">I</kbd>
        </div>
      </AISearchTrigger>
    </div>
  )
}
