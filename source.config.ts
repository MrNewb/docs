import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema'
import { remarkSteps } from 'fumadocs-core/mdx-plugins'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

function plainText(node: { type?: string; value?: string; children?: unknown[] }): string {
  if (!node) return ''
  if (node.type === 'inlineCode' || node.type === 'text' || node.type === 'code') return node.value ?? ''
  if (!Array.isArray(node.children)) return ''
  return node.children.map((child) => plainText(child as { type?: string; value?: string; children?: unknown[] })).join('')
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSteps],
    rehypeCodeOptions: {
      fallbackLanguage: 'txt',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    remarkStructureOptions: {
      stringify(node: { type?: string; value?: string; children?: unknown[] }) {
        return plainText(node)
      },
    },
  },
})
