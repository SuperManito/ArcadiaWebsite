<p align="center">
    <a href="https://arcadia.cool">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="brand/img/arcadia-dark-sub.png" width="320">
            <img src="brand/img/arcadia-light-sub.png" alt="Arcadia" width="320">
        </picture>
    </a>
</p>

<p align="center">
    <strong>
        一站式代码自动化运维平台
    </strong>
</p>

<p align="center">
    <strong>
        <a href="https://arcadia.cool" style="text-decoration: none;">官方网站</a>
    </strong>
</p>

# 文档

文档引擎使用 [Fumadocs](https://fumadocs.dev) + [Next.js](https://nextjs.org) 进行构建

### 安装

```bash
pnpm i
```

### 本地预览

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 生成 OpenAPI 文档

从 `openapi.yaml` 生成对应的 MDX 文档页面，输出至 `docs/openapi/`

```bash
pnpm build:openapi
```
> 注意文件目录结构变化，该命令不会自动删除已经生成的文档文件
