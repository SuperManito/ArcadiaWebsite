import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { HeartHandshake } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function DonateModal() {
  return (
    <a
      href="https://ifdian.net/order/create?user_id=733cde68704311ef85be52540025c377"
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        buttonVariants({
          color: 'outline',
          size: 'icon-xs',
          className: 'py-2 px-3 gap-1 [&_svg]:text-fd-muted-foreground',
        }),
        'no-underline',
      )}
    >
      <div className="flex items-center justify-center gap-1">
        <HeartHandshake size={24} />
        点击捐赠
      </div>
    </a>
  )
}
