import antfu from '@antfu/eslint-config'

export default antfu(
  {
    nextjs: true,
    e18e: false,
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.source/**',
      'docs/**',
    ],
    rules: {
      'no-case-declarations': 'off', // 禁止在 case 或 default 子句中出现词法声明
      'jsdoc/check-param-names': 'off', // 检查 JSDoc 注释中的参数名称
      'regexp/no-unused-capturing-group': 'off', // 检查正则表达式中未使用的捕获组
      'unicorn/consistent-function-scoping': 'off', // 将箭头函数移动到外部作用域
      'markdown/heading-increment': 'off', // 检查 Markdown 文件中的标题级别递增
      'next/no-img-element': 'off', // 禁止使用 <img> 元素，建议使用 next/image 组件
    },
  },
)
