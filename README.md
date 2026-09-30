<div align="center">
<a href="https://arcadia.cool" target="_blank">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./brand/arcadia-dark-sub.png" width="240">
        <img src="./brand/arcadia-light-sub.png" alt="Arcadia" width="240">
    </picture>
</a>
</div>

# 文档

文档使用 [Fumadocs](https://fumadocs.dev) + [Next.js](https://nextjs.org) 进行构建

### 安装

```bash
pnpm i
```

### 本地预览

```bash
pnpm dev
```

### 代码检查

```bash
pnpm lint:fix
pnpm check
```

### 生成 OpenAPI 文档

```bash
pnpm generate:openapi
```
> 从 `openapi.yaml` 生成对应的 MDX 文档页面，输出至 `docs/openapi/`

### 构建

```bash
pnpm build
```
