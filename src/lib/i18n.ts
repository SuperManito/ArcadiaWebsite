import { defineI18n } from 'fumadocs-core/i18n'
import { defineI18nOpenAPI } from 'fumadocs-openapi/i18n'
import { defineI18nUI } from 'fumadocs-ui/i18n'

export const i18n = defineI18n({
  defaultLanguage: 'cn',
  languages: ['cn'],
})

// See type Translations
// https://github.com/fuma-nama/fumadocs/blob/main/packages/base-ui/src/contexts/i18n.tsx
export const i18nUI = defineI18nOpenAPI(defineI18nUI(i18n, {
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
}), {
  cn: {
    loading: '加载中...',
    empty: '暂无数据',
    copy: '复制',
    send: '发送',
    authorization: '授权',
    cookies: 'Cookies',
    query: '查询参数',
    path: '路径参数',
    header: '请求头',
    body: '请求体',
    deprecated: '已弃用',
    submit: '提交',
    unsupported: '不支持',
    close: '关闭',
    inputPlaceholder: '请输入值',

    // 请求标签页
    titleRequestTabs: '请求示例',
    requestTabNameDefault: '默认示例',
    queryParameters: '查询参数',
    pathParameters: '路径参数',
    headerParameters: '请求头参数',
    cookieParameters: 'Cookie 参数',

    // 操作区域
    titleRequestBody: '请求体',
    titleResponseBody: '响应体',
    titleCallbacks: '回调',

    // 认证方式
    authBasicTokenExample: 'Basic <令牌>',
    authBearerTokenExample: 'Bearer <令牌>',
    openIdConnect: 'OpenID Connect',
    authTokenIn: '位置',
    authScope: '权限范围',

    // TypeScript 面板
    typeScriptDefinitions: 'TypeScript 类型定义',
    useTypeInTypeScript: '在 TypeScript 中使用 {name} 类型。',

    // 模式信息标签
    schemaDefault: '默认值',
    schemaMatch: '匹配规则',
    schemaFormat: '格式',
    schemaMultipleOf: '倍数',
    schemaRange: '范围',
    schemaLength: '长度',
    schemaProperties: '属性',
    schemaItems: '数据项',
    schemaValueIn: '可选值',
    schemaExample: '示例',

    // 响应标签页
    responseTabName: '{key} 示例',
    responseTabNameDefault: '默认示例',

    // 调试面板
    closeJsonEditor: '收起 JSON 编辑器',
    openJsonEditor: '展开 JSON 编辑器',
    accessToken: '访问令牌',
    authorize: '授权',
    openIdUnsupported: '暂不支持 OpenID Connect，您可以在此手动设置访问令牌。',

    // 状态信息
    statusBadRequest: '请求错误',
    statusUnauthorized: '未授权',
    statusForbidden: '禁止访问',
    statusNotFound: '未找到',
    statusInternalServerError: '服务器内部错误',
    statusSuccessful: '请求成功',
    statusError: '请求失败',
    statusClientError: '客户端错误',
    statusBinaryBody: '二进制响应体',

    // OAuth 对话框
    obtainAccessToken: '获取 API 访问令牌。',
    resourceOwnerPassword: '密码模式',
    resourceOwnerPasswordDesc: '使用用户名和密码进行认证。',
    clientCredentials: '客户端模式',
    clientCredentialsDesc: '适用于服务器之间的认证。',
    authorizationCode: '授权码模式',
    authorizationCodeDesc: '通过第三方服务进行认证',
    implicit: '隐式模式',
    implicitDesc: '直接获取访问令牌。',
    deviceAuthorization: '设备授权模式',
    deviceAuthorizationDesc: '通过设备进行认证。',
    clientId: '客户端 ID',
    clientIdHint: '请输入您的 OAuth 应用客户端 ID。',
    clientSecret: '客户端密钥',
    clientSecretHint: '请输入您的 OAuth 应用客户端密钥。',
    usernameField: '用户名',
    passwordField: '密码',
    fetchingToken: '正在获取令牌...',
    fetchTokenError: '获取令牌失败',

    // 服务器选择
    serverUrl: '服务器地址',
    serverUrlDescription: 'API 接口的基础 URL。',
    serverUrlFieldPlaceholder: '请输入服务器地址',

    // 模式界面
    schemaShowArray: '展开数组项',
    schemaHideArray: '收起数组项',
    schemaFilterPropertiesPlaceholder: '筛选属性',
    schemaFilterPropertiesEmpty: '未找到匹配的属性',

    // 输入控件（调试面板）
    playgroundShowProperty: '显示属性',
    playgroundPropertyPlaceholder: '请输入属性名',
    playgroundNewProperty: '新增属性',
    playgroundNewItem: '新增项',
    playgroundRemoveItem: '删除项',
    playgroundSelectPlaceholder: '请选择',
    playgroundSelected: '已选择',
    playgroundInputUpload: '上传',
    playgroundInputUnset: '取消设置',
  },
})
