export interface FeatureItem {
  title: string
  description: string
  icon: string
}

export const features: FeatureItem[] = [
  {
    title: '定时任务调度',
    description: '内置秒级调度引擎，支持高并发执行与可视化监控仪表盘。全面的增删改查、调试运行、日志溯源、自定义排序。',
    icon: 'tabler:clock-play',
  },
  {
    title: '守护任务管理',
    description: '平台支持创建与管理持续运行的任务，可将代码文件设置为守护任务并一键启动，支持实时日志查看与丰富的启动配置。',
    icon: 'tabler:shield-code',
  },
  {
    title: '运行日志检索',
    description: '提供实时滚动、内容高亮、字体缩放、名称与日期范围过滤等能力，兼具反转输出与轮询刷新等高级模式，快速定位任意执行记录。',
    icon: 'mdi:text-box-search-outline',
  },
  {
    title: '脚本快捷导入',
    description: '支持通过 Git 仓库地址一键克隆拉取脚本，可灵活配置分支、认证信息等参数；同时支持通过互联网链接直接订阅脚本文件。',
    icon: 'mdi:download-box-outline',
  },
  {
    title: '环境配置可视化',
    description: '以结构化数据表格统一管理底层环境变量与依赖包，支持分组聚合、排序，告别零散的配置文件，让执行环境的维护变得清晰可控。',
    icon: 'mingcute:settings-7-line',
  },
  {
    title: '沉浸式代码编辑',
    description: '深度定制 Monaco Editor，在网页端还原桌面级的语法高亮。支持标签页多开与移动端适配，随时随地高效编写与调试代码。',
    icon: 'ci:window-code-block',
  },
  {
    title: '文件可视化管理',
    description: '以仿桌面的交互方式管理云端文件，支持平铺与列表双视图切换，涵盖创建、重命名、拖拽移动、编辑预览、上传与下载等完整操作。',
    icon: 'mdi:folder-open-outline',
  },
  {
    title: 'Web 终端',
    description: '内置基于 Ghostty 驱动的高性能实时终端，支持多窗口、快捷键操作，可随时随地流畅执行任意命令行任务。',
    icon: 'mdi:console',
  },
  {
    title: '完整适配移动端',
    description: '控制面板在保持功能完整的前提下针对移动设备进行了深度定制与触摸行为优化，能在手机上获得流畅的使用体验。',
    icon: 'material-symbols:phone-android-rounded',
  },
  {
    title: 'CLI 与开放接口',
    description: '提供功能完备的命令行工具与标准 OpenAPI 接口，支持与第三方系统深度集成，将平台能力无缝延伸至现有工作流。',
    icon: 'mdi:api',
  },
]
