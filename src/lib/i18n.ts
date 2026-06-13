import { zhCN } from '@fumadocs/language/zh-cn'
import { defineI18n } from 'fumadocs-core/i18n'
import { openapiTranslations } from 'fumadocs-openapi/i18n'
import { uiTranslations } from 'fumadocs-ui/i18n'

export const i18n = defineI18n({
  defaultLanguage: 'zh-CN',
  languages: ['zh-CN'],
})

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .extend(openapiTranslations())
  .preset('zh-CN', zhCN())
