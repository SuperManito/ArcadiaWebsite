import { Card } from 'fumadocs-ui/components/card'

const stores = [
  {
    name: '1Panel 应用商店',
    href: 'https://apps.fit2cloud.com/1panel',
    icon: '/images/store/1panel.webp',
  },
  {
    name: '飞牛应用中心',
    href: 'https://fnnas.com',
    icon: '/images/store/fnos.png',
    label: '飞牛 fnOS',
  },
  {
    name: 'iStore 软件中心',
    href: 'https://site.istoreos.com/software',
    icon: '/images/store/istoreos.png',
    label: 'iStoreOS',
  },
]

export function StoreCards() {
  return (
    <div className="grid grid-cols-2 gap-3 md:flex">
      {stores.map(store => (
        <Card
          key={store.name}
          href={store.href}
          title={(
            <span className="flex items-center gap-2">
              <img
                src={store.icon}
                alt={store.label ?? store.name}
                className="h-5 w-auto rounded-lg md:h-6"
              />
              {store.label && (
                <span className="text-sm leading-none font-bold md:text-base">
                  {store.label}
                </span>
              )}
            </span>
          )}
          description={store.name}
          className="py-3! md:w-48"
        />
      ))}
    </div>
  )
}
