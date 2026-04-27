'use client'
import type { UseChatHelpers } from '@ai-sdk/react'
import type { ReasoningUIPart, Tool, UIToolInvocation } from 'ai'
import type { ComponentProps, ReactNode, SyntheticEvent } from 'react'
import type { ChatUIMessage, SearchTool } from '../../app/api/chat/route'
import { useChat } from '@ai-sdk/react'
import { Presence } from '@radix-ui/react-presence'
import { DefaultChatTransport } from 'ai'
import { ChevronDown, MessageCircleIcon, RefreshCw, SearchIcon, Send, X } from 'lucide-react'
import {
  createContext,
  use,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AnimatedShinyText } from '@/components/ShinyText'
import { cn } from '../../lib/cn'
import { Markdown } from '../markdown'
import { buttonVariants } from '../ui/button'

const Context = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  chat: UseChatHelpers<ChatUIMessage>
} | null>(null)

export function AISearchPanelHeader({ className, ...props }: ComponentProps<'div'>) {
  const { setOpen } = useAISearchContext()

  return (
    <div
      className={cn(
        'sticky top-0 flex items-start gap-2 border rounded-xl bg-fd-secondary text-fd-secondary-foreground shadow-sm',
        className,
      )}
      {...props}
    >
      <div className="px-3 py-2 flex-1">
        <p className="text-sm font-medium mb-2">AI 聊天</p>
        <p className="text-xs text-fd-muted-foreground">AI 可能不准确，请核实答案。</p>
      </div>

      <button
        aria-label="关闭"
        tabIndex={-1}
        className={cn(
          buttonVariants({
            size: 'icon-sm',
            color: 'ghost',
            className: 'text-fd-muted-foreground rounded-full',
          }),
        )}
        onClick={() => setOpen(false)}
      >
        <X />
      </button>
    </div>
  )
}

export function AISearchInputActions() {
  const { messages, status, setMessages, regenerate } = useChatContext()
  const isLoading = status === 'streaming'

  if (messages.length === 0)
    return null

  return (
    <>
      {!isLoading && messages.at(-1)?.role === 'assistant' && (
        <button
          type="button"
          className={cn(
            buttonVariants({
              color: 'secondary',
              size: 'sm',
              className: 'rounded-full gap-1.5',
            }),
          )}
          onClick={() => regenerate()}
        >
          <RefreshCw className="size-4" />
          重试
        </button>
      )}
      <button
        type="button"
        className={cn(
          buttonVariants({
            color: 'secondary',
            size: 'sm',
            className: 'rounded-full',
          }),
        )}
        onClick={() => setMessages([])}
      >
        清空聊天
      </button>
    </>
  )
}

const StorageKeyInput = '__ai_search_input'
export function AISearchInput(props: ComponentProps<'form'>) {
  const { status, sendMessage, stop } = useChatContext()
  const [input, setInput] = useState(() => localStorage.getItem(StorageKeyInput) ?? '')
  const isLoading = status === 'streaming' || status === 'submitted'
  const onStart = (e?: SyntheticEvent) => {
    e?.preventDefault()
    const message = input.trim()
    if (message.length === 0)
      return

    void sendMessage({
      role: 'user',
      parts: [
        {
          type: 'data-client',
          data: {
            location: location.href,
          },
        },
        {
          type: 'text',
          text: message,
        },
      ],
    })
    setInput('')
    localStorage.removeItem(StorageKeyInput)
  }

  useEffect(() => {
    if (isLoading)
      document.getElementById('nd-ai-input')?.focus()
  }, [isLoading])

  return (
    <form {...props} className={cn('flex items-start pe-2', props.className)} onSubmit={onStart}>
      <Input
        value={input}
        placeholder={isLoading ? 'AI 正在回答…' : '提问'}
        autoFocus
        className="p-3"
        disabled={status === 'streaming' || status === 'submitted'}
        onChange={(e) => {
          setInput(e.target.value)
          localStorage.setItem(StorageKeyInput, e.target.value)
        }}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === 'Enter') {
            onStart(event)
          }
        }}
      />
      {isLoading
        ? (
            <button
              key="bn"
              type="button"
              className={cn(
                buttonVariants({
                  color: 'secondary',
                  className: 'transition-all rounded-full mt-2 gap-2',
                }),
              )}
              onClick={stop}
            >
              <LoadingIcon className="size-4 text-fd-muted-foreground" />
              中止回答
            </button>
          )
        : (
            <button
              key="bn"
              type="submit"
              className={cn(
                buttonVariants({
                  color: 'primary',
                  className: 'transition-all rounded-full mt-2',
                }),
              )}
              disabled={input.length === 0}
            >
              <Send className="size-4" />
            </button>
          )}
    </form>
  )
}

function List(props: Omit<ComponentProps<'div'>, 'dir'>) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current)
      return
    function callback() {
      const container = containerRef.current
      if (!container)
        return

      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'instant',
      })
    }

    const observer = new ResizeObserver(callback)
    callback()

    const element = containerRef.current?.firstElementChild

    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn('fd-scroll-container overflow-y-auto min-w-0 flex flex-col', props.className)}
    >
      {props.children}
    </div>
  )
}

function Input(props: ComponentProps<'textarea'>) {
  const ref = useRef<HTMLDivElement>(null)
  const shared = cn('col-start-1 row-start-1', props.className)

  return (
    <div className="grid flex-1">
      <textarea
        id="nd-ai-input"
        {...props}
        className={cn(
          'resize-none bg-transparent placeholder:text-fd-muted-foreground focus-visible:outline-none',
          shared,
        )}
      />
      <div ref={ref} className={cn(shared, 'break-all invisible')}>
        {`${props.value?.toString() ?? ''}\n`}
      </div>
    </div>
  )
}

const roleName: Record<string, string> = {
  user: '你',
  assistant: 'Arcadia',
}

function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn('shrink-0', className)}>
      <g stroke="currentColor">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeLinecap="round" strokeWidth="3">
          <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150" />
          <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59" />
        </circle>
        <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
      </g>
    </svg>
  )
}

function SearchBlock({ call }: { call: UIToolInvocation<SearchTool> }) {
  const hasError = call.state === 'output-error' || call.state === 'output-denied'
  const isSearching = !hasError && !call.output
  const query = (call.input as { query?: string } | undefined)?.query

  return (
    <div className="mb-3 text-xs border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-fd-muted-foreground">
        {isSearching
          ? <LoadingIcon className="size-3" />
          : <SearchIcon className={cn('size-3 shrink-0', hasError && 'text-red-500')} />}
        <span className={cn('font-medium shrink-0', hasError && 'text-red-500')}>
          {hasError
            ? (call.errorText ?? '搜索失败')
            : isSearching
              ? <AnimatedShinyText>正在搜索</AnimatedShinyText>
              : `${call.output?.length ?? 0} 条搜索结果`}
        </span>
        {query && !hasError && (
          <span className="text-fd-muted-foreground/60 truncate min-w-0">
            「
            {query}
            」
          </span>
        )}
      </div>
    </div>
  )
}

function PendingBlock() {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-fd-primary">Arcadia</p>
      <div className="text-xs border rounded-lg overflow-hidden">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-fd-muted-foreground">
          <LoadingIcon className="size-3" />
          <span className="font-medium"><AnimatedShinyText>正在处理中，请稍后…</AnimatedShinyText></span>
        </div>
      </div>
    </div>
  )
}

function ThinkingBlock({ text, isThinking }: { text: string, isThinking: boolean }) {
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (!isThinking) {
      const timer = setTimeout(() => setExpanded(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isThinking])

  return (
    <div className="mb-2 text-xs border rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-fd-muted-foreground hover:bg-fd-muted/40 transition-colors text-left"
        onClick={() => setExpanded(e => !e)}
      >
        {(!isThinking || !!text.trim()) && <ChevronDown className={cn('size-3 shrink-0 transition-transform duration-200', !expanded && '-rotate-90')} />}
        <span className="font-medium">
          {isThinking ? <AnimatedShinyText>正在思考</AnimatedShinyText> : '已思考'}
        </span>
      </button>
      {expanded && (
        <div className="px-2.5 py-2 border-t text-fd-muted-foreground/70 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto fd-scroll-container">
          {text.trim() || '…'}
        </div>
      )}
    </div>
  )
}

function Message({ message, isActive = false, ...props }: { message: ChatUIMessage, isActive?: boolean } & ComponentProps<'div'>) {
  let markdown = ''
  let reasoningText = ''
  let isThinking = false
  const searchCalls: UIToolInvocation<SearchTool>[] = []

  for (const part of message.parts ?? []) {
    if (part.type === 'text') {
      markdown += part.text
      continue
    }

    if (part.type === 'reasoning') {
      const rp = part as ReasoningUIPart
      reasoningText += rp.text
      if (rp.state === 'streaming' && isActive)
        isThinking = true
      continue
    }

    if (part.type.startsWith('tool-')) {
      const toolName = part.type.slice('tool-'.length)
      const p = part as UIToolInvocation<Tool>

      if (toolName !== 'search' || !p.toolCallId)
        continue
      searchCalls.push(p)
    }
  }

  return (
    <div onClick={e => e.stopPropagation()} {...props}>
      <div
        className={cn(
          'mb-1 flex items-center gap-1.5',
          message.role === 'assistant' ? 'text-fd-primary' : 'text-fd-muted-foreground',
        )}
      >
        <span className="text-sm font-medium">{roleName[message.role] ?? 'unknown'}</span>
        {isActive && message.role === 'assistant' && (
          <LoadingIcon className="size-3 opacity-60" />
        )}
      </div>

      {message.role === 'assistant' && reasoningText && (
        <ThinkingBlock text={reasoningText} isThinking={isThinking} />
      )}

      {searchCalls
        .filter(c => !(Array.isArray(c.output) && c.output.length === 0))
        .map(call => (
          <SearchBlock key={call.toolCallId} call={call} />
        ))}

      {markdown && (
        <div className="prose text-sm">
          <Markdown text={markdown} />
        </div>
      )}
    </div>
  )
}

export function AISearch({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const chat = useChat<ChatUIMessage>({
    id: 'search',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  return (
    <Context value={useMemo(() => ({ chat, open, setOpen }), [chat, open])}>{children}</Context>
  )
}

export function AISearchTrigger({
  position = 'default',
  className,
  ...props
}: ComponentProps<'button'> & { position?: 'default' | 'float' }) {
  const { open, setOpen } = useAISearchContext()

  return (
    <button
      data-state={open ? 'open' : 'closed'}
      className={cn(
        position === 'float' && [
          'fixed bottom-4 gap-3 w-24 inset-e-[calc(--spacing(4)+var(--removed-body-scroll-bar-size,0px))] shadow-lg z-20 transition-[translate,opacity]',
          open && 'translate-y-10 opacity-0',
        ],
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {props.children}
    </button>
  )
}

export function AISearchPanel() {
  const { open, setOpen } = useAISearchContext()
  useHotKey()

  return (
    <>
      <style>
        {`
        @keyframes ask-ai-open {
          from {
            translate: 100% 0;
          }
          to {
            translate: 0 0;
          }
        }
        @keyframes ask-ai-close {
          from {
            width: var(--ai-chat-width);
          }
          to {
            width: 0px;
          }
        }`}
      </style>
      <Presence present={open}>
        <div
          data-state={open ? 'open' : 'closed'}
          className="fixed inset-0 z-30 backdrop-blur-xs bg-fd-overlay data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out lg:hidden"
          onClick={() => setOpen(false)}
        />
      </Presence>
      <Presence present={open}>
        <div
          className={cn(
            'overflow-hidden z-30 bg-fd-card text-fd-card-foreground [--ai-chat-width:400px] 2xl:[--ai-chat-width:460px]',
            'max-lg:fixed max-lg:inset-x-2 max-lg:inset-y-4 max-lg:border max-lg:rounded-2xl max-lg:shadow-xl',
            'lg:sticky lg:top-0 lg:h-dvh lg:border-s lg:ms-auto lg:in-[#nd-docs-layout]:[grid-area:toc] lg:in-[#nd-notebook-layout]:row-span-full lg:in-[#nd-notebook-layout]:col-start-5',
            open
              ? 'animate-fd-dialog-in lg:animate-[ask-ai-open_200ms]'
              : 'animate-fd-dialog-out lg:animate-[ask-ai-close_200ms]',
          )}
        >
          <div className="flex flex-col size-full p-2 lg:p-3 lg:w-(--ai-chat-width)">
            <AISearchPanelHeader />
            <AISearchPanelList className="flex-1" />
            <div className="rounded-xl border bg-fd-secondary text-fd-secondary-foreground shadow-sm has-focus-visible:shadow-md">
              <AISearchInput />
              <div className="flex items-center gap-1.5 p-1 empty:hidden">
                <AISearchInputActions />
              </div>
            </div>
          </div>
        </div>
      </Presence>
    </>
  )
}

export function AISearchPanelList({ className, style, ...props }: ComponentProps<'div'>) {
  const chat = useChatContext()
  const messages = chat.messages.filter(msg => msg.role !== 'system')
  const isPending = chat.status === 'submitted'

  return (
    <List
      className={cn('py-4 overscroll-contain', className)}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, white 1rem, white calc(100% - 1rem), transparent 100%)',
        ...style,
      }}
      {...props}
    >
      {messages.length === 0 && !isPending
        ? (
            <div className="text-sm text-fd-muted-foreground/80 size-full flex flex-col items-center justify-center text-center gap-2">
              <MessageCircleIcon fill="currentColor" stroke="none" />
              <p onClick={e => e.stopPropagation()}>请在下方开始新的聊天。</p>
            </div>
          )
        : (
            <div className="flex flex-col px-3 gap-4">
              {messages.map((item, index) => (
                <Message
                  key={item.id}
                  message={item}
                  isActive={
                    chat.status === 'streaming'
                    && index === messages.length - 1
                    && item.role === 'assistant'
                  }
                />
              ))}
              {isPending && <PendingBlock />}
              {chat.error && (
                <p className="text-xs text-red-500 wrap-break-word whitespace-pre-wrap">
                  {chat.error.message.startsWith('Invalid input') || chat.error.message.includes('Type validation failed')
                    ? '工具调用参数无效，请重试。'
                    : chat.error.message || '请求失败，请重试。'}
                </p>
              )}
            </div>
          )}
    </List>
  )
}

export function useHotKey() {
  const { open, setOpen } = useAISearchContext()

  const onKeyPress = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false)
      e.preventDefault()
    }

    if (e.key.toLowerCase() === 'i' && (e.metaKey || e.ctrlKey) && !open) {
      setOpen(true)
      e.preventDefault()
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress)
    return () => window.removeEventListener('keydown', onKeyPress)
  }, [])
}

export function useAISearchContext() {
  return use(Context)!
}

function useChatContext() {
  return use(Context)!.chat
}
