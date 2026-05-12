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
      'README.md',
    ],
    rules: {
      'no-case-declarations': 'off',
      'jsdoc/check-param-names': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'markdown/heading-increment': 'off',
      'next/no-img-element': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
