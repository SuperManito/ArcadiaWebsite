export interface ScrollFeatureItem {
  title: string
  description: string
  imgUrlDark: string
  imgUrlLight: string
  badge: string
}

export const scrollFeatures: ScrollFeatureItem[] = [
  {
    title: '定时任务数据监控可视化',
    description: '多维监控仪表盘实时呈现任务运行状态与历史趋势，快速定位异常、洞察执行规律。',
    imgUrlDark: '/images/feature/scroll-feature-1-dark.png',
    imgUrlLight: '/images/feature/scroll-feature-1-light.png',
    badge: '任务可视化',
  },
  {
    title: '灵活的脚本订阅与仓库同步',
    description: '支持通过 Git 仓库一键拉取脚本，亦可直接订阅远程单文件，脚本内容始终与上游保持同步。',
    imgUrlDark: '/images/feature/scroll-feature-2-dark.png',
    imgUrlLight: '/images/feature/scroll-feature-2-light.png',
    badge: '代码同步',
  },
  {
    title: '强大的运行日志检索',
    description: '日志组件支持内容高亮、实时滚动追踪与日期范围过滤，高级模式提供反转输出与自动轮询刷新，异常排查与持续监控皆直观可控。',
    imgUrlDark: '/images/feature/scroll-feature-3-dark.png',
    imgUrlLight: '/images/feature/scroll-feature-3-light.png',
    badge: '日志检索',
  },
  {
    title: '桌面级文件管理',
    description: '以桌面级交互体验管理文件，平铺与列表视图自由切换，支持多选、拖拽移动等丰富操作。',
    imgUrlDark: '/images/feature/scroll-feature-4-dark.png',
    imgUrlLight: '/images/feature/scroll-feature-4-light.png',
    badge: '文件管理',
  },
]
