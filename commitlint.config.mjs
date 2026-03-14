/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 提交类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响功能）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或外部依赖变更
        'ci', // CI 配置变更
        'chore', // 其他杂项
        'revert', // 回滚提交
      ],
    ],
    // 标题最大长度
    'header-max-length': [2, 'always', 100],
    // 标题不能为空
    'subject-empty': [2, 'never'],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 类型必须小写
    'type-case': [2, 'always', 'lower-case'],
  },
}
