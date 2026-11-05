import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

// GitHub Pages 没有 SPA 回退。把构建出的 index.html 复制到每个路由目录，
// 深链和刷新才会落到同一份前端。
const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const index = readFileSync(join(dist, 'index.html'))

const slugs = readdirSync(join(root, 'content/cases'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.replace(/\.md$/, ''))

const routes = ['work', 'about', ...slugs.map((slug) => `work/${slug}`)]

for (const route of routes) {
  const file = join(dist, route, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, index)
}

writeFileSync(join(dist, '404.html'), index)
console.log(`pages-routes: wrote ${routes.length} route indexes + 404.html`)
