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
      const fileName = arr[arr.length - 1]
      return `${dirName}/${fileName}-${method}`
    }
    const hook = document.webhooks![output.item.name][output.item.method]!
    return `webhook/${hook}`
  },
})
