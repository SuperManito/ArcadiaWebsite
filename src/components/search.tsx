'use client'
import type { SharedProps } from 'fumadocs-ui/components/dialog/search'
import { create } from '@orama/orama'
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { useDocsSearch } from 'fumadocs-core/search/client'
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from 'fumadocs-ui/components/dialog/search'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
// import { useI18n } from 'fumadocs-ui/contexts/i18n'

function initOrama() {
  return create({
    schema: { _: 'string' },
    // https://docs.orama.com/docs/orama-js/supported-languages
    components: {
      tokenizer: createTokenizer({
        language: 'mandarin',
        stopWords: mandarinStopwords,
      }),
    },
  })
}

const items = [
  {
    name: '全部',
    value: undefined,
  },
  {
    name: '入门指南',
    description: '使用文档',
    value: 'main',
  },
  {
    name: 'Arcadia CLI',
    description: '命令行',
    value: 'cli',
  },
  {
    name: 'Arcadia API',
    description: '应用程序接口',
    value: 'api',
  },
  {
    name: 'Arcadia OpenAPI',
    description: '开放应用程序接口',
    value: 'openapi',
  },
]

export default function DefaultSearchDialog(props: SharedProps) {
  const [open, setOpen] = useState(false)
  const [tag, setTag] = useState<string | undefined>()
  // const { locale } = useI18n() // (optional) for i18n
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    tag,
    // locale,
  })

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />

        <SearchDialogFooter className="flex flex-row flex-wrap gap-2 items-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className={buttonVariants({
                size: 'sm',
                color: 'ghost',
                className: '-m-1.5 me-auto',
              })}
            >
              <span className="text-fd-muted-foreground/80 me-2">过滤</span>
              {items.find(item => item.value === tag)?.name}
              <ChevronDown className="size-3.5 text-fd-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-1 gap-1" align="start">
              {items.map((item, i) => {
                const isSelected = item.value === tag

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setTag(item.value)
                      setOpen(false)
                    }}
                    className={cn(
                      'rounded-lg text-start px-2 py-1.5',
                      isSelected
                        ? 'text-fd-primary bg-fd-primary/10'
                        : 'hover:text-fd-accent-foreground hover:bg-fd-accent transition-colors',
                    )}
                  >
                    <p className="font-medium mb-0.5">{item.name}</p>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </button>
                )
              })}
            </PopoverContent>
            <a
              href="https://orama.com"
              rel="noreferrer noopener"
              className="text-xs text-nowrap text-fd-muted-foreground"
            >
              Powered by Orama
            </a>
          </Popover>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  )
}
