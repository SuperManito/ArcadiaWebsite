'use client'

import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import Link from 'fumadocs-core/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'fumadocs-ui/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

export interface ParameterNode {
  name: string
  description: ReactNode
}

export interface TypeNode {
  /**
   * Additional description of the field
   */
  description?: ReactNode
  /**
   * type signature (short)
   */
  type: ReactNode
  /**
   * type signature (full)
   */
  typeDescription?: ReactNode
  /**
   * Optional `href` for the type
   */
  typeDescriptionLink?: string
  default?: ReactNode
  required?: boolean
  deprecated?: boolean
  noRequiredMark?: boolean
  /**
   * a list of parameters info if the type is a function.
   */
  parameters?: ParameterNode[]
  returns?: ReactNode
}

const fieldVariants = cva('text-fd-muted-foreground not-prose pe-2')

export function TypeTable({
  id,
  type,
  noRequiredMark,
  className,
  ...props
}: { type: Record<string, TypeNode>, noRequiredMark?: boolean } & ComponentProps<'div'>) {
  return (
    <div
      id={id}
      className={cn(
        '@container flex flex-col p-1 bg-fd-card text-fd-card-foreground rounded-2xl border my-6 text-sm overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="flex font-medium items-center px-3 py-1 not-prose text-fd-muted-foreground">
        <p className="w-2/5">参数</p>
        <p className="@max-xl:hidden">类型</p>
      </div>
      {Object.entries(type).map(([key, value]) => (
        <Item key={key} parentId={id} name={key} item={value} noRequiredMark={noRequiredMark} />
      ))}
    </div>
  )
}

function Item({
  parentId,
  name,
  noRequiredMark,
  item: {
    parameters = [],
    description,
    required = false,
    deprecated,
    typeDescription,
    default: defaultValue,
    type,
    typeDescriptionLink,
    returns,
  },
}: {
  parentId?: string
  name: string
  noRequiredMark?: boolean
  item: TypeNode
}) {
  const [open, setOpen] = useState(false)
  const id = parentId ? `${parentId}-${name}` : undefined

  useEffect(() => {
    const hash = window.location.hash
    if (!id || !hash)
      return
    if (`#${id}` === hash)
      setOpen(true)
  }, [id])

  return (
    <Collapsible
      id={id}
      open={open}
      onOpenChange={(v: any) => {
        if (v && id) {
          window.history.replaceState(null, '', `#${id}`)
        }
        setOpen(v)
      }}
      className={cn(
        'rounded-xl border overflow-hidden scroll-m-20 transition-all',
        open ? 'shadow-sm bg-fd-background not-last:mb-2' : 'border-transparent',
      )}
    >
      <CollapsibleTrigger className="relative flex flex-row items-center w-full group text-start px-3 py-2 not-prose hover:bg-fd-accent">
        <code
          className={cn(
            'text-fd-primary min-w-fit w-2/5 font-mono font-medium pe-2',
            deprecated && 'line-through text-fd-primary/50',
          )}
        >
          {name}
          {required && !noRequiredMark && (
            <span
              className="selet-none"
              style={{
                whiteSpace: 'nowrap',
                color: '#e88080',
                transition: 'color .3s cubic-bezier(.4, 0, .2, 1)',
              }}
            >
            &thinsp;*
            </span>
          )}

        </code>
        {typeDescriptionLink
          ? (
              <Link href={typeDescriptionLink} className="underline @max-xl:hidden">
                {type}
              </Link>
            )
          : (
              <span className="@max-xl:hidden type-table-type-highlight">{type}</span>
            )}
        <ChevronDown className="absolute inset-e-2 size-4 text-fd-muted-foreground transition-transform group-data-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-[1fr_3fr] gap-y-4 text-sm p-3 overflow-auto fd-scroll-container border-t">
          <div className="text-sm prose col-span-full prose-no-margin empty:hidden">
            {description}
          </div>
          {typeDescription && (
            <>
              <p className={cn(fieldVariants())}>类型说明</p>
              <p className="my-auto not-prose">{typeDescription}</p>
            </>
          )}
          {defaultValue && (
            <>
              <p className={cn(fieldVariants())}>默认值</p>
              <p className="my-auto not-prose font-mono">{defaultValue}</p>
            </>
          )}
          {parameters.length > 0 && (
            <>
              <p className={cn(fieldVariants())}>参数</p>
              <div className="flex flex-col gap-2">
                {parameters.map(param => (
                  <div key={param.name} className="inline-flex items-center flex-wrap gap-1">
                    <p className="font-medium not-prose text-nowrap">
                      {param.name}
                      {' '}
                      -
                    </p>
                    <div className="text-sm prose prose-no-margin">{param.description}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {returns && (
            <>
              <p className={cn(fieldVariants())}>返回值</p>
              <div className="my-auto text-sm prose prose-no-margin">{returns}</div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
