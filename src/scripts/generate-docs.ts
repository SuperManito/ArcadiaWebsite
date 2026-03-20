import { unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { generateFiles } from 'fumadocs-openapi'
import { openapi } from '@/lib/openapi'

void generateFiles({
  input: openapi,
  output: './docs/openapi',
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
  name: (output, document) => {
    if (output.type === 'operation') {
      const { path, method } = output.item
      const arr = path.split('/')
      const dirName = arr[1]
      const fileName = arr.slice(2).join('-').replace(/\//g, '-')
      const rel = `${dirName}/${fileName}-${method}`
      // 删除旧文件以清理缓存
      try {
        const target = join(cwd(), 'docs', 'openapi', `${rel}.mdx`)
        unlinkSync(target)
      }
      catch (e: any) {
        console.log(e.message || e)
      }
      return rel
    }
    const hook = document.webhooks![output.item.name][output.item.method]!
    return `webhook/${hook}`
  },
})
