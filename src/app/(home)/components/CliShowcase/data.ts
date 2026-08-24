export interface LogoIconItem {
  href: string
  title: string
  icon: string
  mobileSize: number
  desktopSize: number
  mobileMarginTop?: string
  desktopMarginTop?: string
}

export const iconLogoItems: LogoIconItem[] = [
  { href: 'https://typestrong.org/ts-node', title: 'ts-node', icon: 'logos:tsnode', mobileSize: 14, desktopSize: 42, mobileMarginTop: '0', desktopMarginTop: '2px' },
  { href: 'https://deno.com', title: 'Deno', icon: 'vscode-icons:file-type-deno', mobileSize: 20, desktopSize: 48 },
  { href: 'https://bun.sh', title: 'Bun', icon: 'logos:bun', mobileSize: 16, desktopSize: 46, mobileMarginTop: '0', desktopMarginTop: '2px' },
  { href: 'https://www.python.org', title: 'Python', icon: 'logos:python', mobileSize: 18, desktopSize: 44, mobileMarginTop: '0', desktopMarginTop: '2px' },
  { href: 'https://golang.org', title: 'Go', icon: 'logos:go', mobileSize: 14, desktopSize: 42, mobileMarginTop: '3px', desktopMarginTop: '2px' },
  { href: 'https://www.rust-lang.org', title: 'Rust', icon: 'vscode-icons:file-type-rust', mobileSize: 18, desktopSize: 52 },
  { href: 'https://www.lua.org', title: 'Lua', icon: 'logos:lua', mobileSize: 18, desktopSize: 50, mobileMarginTop: '2px', desktopMarginTop: '2px' },
  { href: 'https://www.ruby-lang.org', title: 'Ruby', icon: 'logos:ruby', mobileSize: 16, desktopSize: 36, mobileMarginTop: '0', desktopMarginTop: '2px' },
  { href: 'https://www.perl.org', title: 'Perl', icon: 'vscode-icons:file-type-perl', mobileSize: 18, desktopSize: 44, mobileMarginTop: '0', desktopMarginTop: '2px' },
]

export const fileExtensions = ['js', 'ts', 'py', 'go', 'rs', 'lua', 'rb', 'pl', 'c', 'sh']

export interface CliCapabilityItem {
  key: 'concurrency' | 'sandbox'
  title: string
  tag?: string
  description: string
}

export const cliCapabilities: CliCapabilityItem[] = [
  {
    key: 'concurrency',
    title: '并发执行',
    description: '支持多任务并发执行，批量处理显著提速；各任务日志独立归档，互不干扰。',
  },
  {
    key: 'sandbox',
    title: '沙箱隔离',
    tag: '实验性',
    description: '在受限环境中执行代码，严格约束文件与网络访问，稳妥运行来源不明的脚本。',
  },
]
