import { defineI18n } from 'fumadocs-core/i18n'
import { defineI18nUI } from 'fumadocs-ui/i18n'

export const i18n = defineI18n({
  defaultLanguage: 'cn',
  languages: ['cn'],
})

// See type Translations
// https://github.com/fuma-nama/fumadocs/blob/main/packages/base-ui/src/contexts/i18n.tsx
export const i18nUI = defineI18nUI(i18n, {
  translations: {
    cn: {
      displayName: '简体中文',
      search: '搜索',
      searchNoResult: '未找到结果',
      toc: '目录',
      tocNoHeadings: '此页面没有标题',
      lastUpdate: '最后更新',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '选择主题',
      editOnGithub: '在 GitHub 上编辑',
    },
  },
})
