import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const read = (path) => readFileSync(join(root, path), 'utf8')

const fail = (message) => {
  console.error(`content check failed: ${message}`)
  process.exit(1)
}

const site = JSON.parse(read('content/site.json'))
if (site.name !== 'Yanan Wei') fail('site.name')
if (site.sloganCn !== '做能自己每天用的自动化与信息工作流') fail('site.sloganCn')
if (!site.sloganEn || site.sloganEn.length < 12) fail('site.sloganEn')
if (site.github !== 'https://github.com/viananJune') fail('site.github')
if (site.githubHandle !== 'viananJune') fail('site.githubHandle')
if (typeof site.intro !== 'string' || site.intro.length < 40) fail('site.intro')
if (typeof site.contactNote !== 'string' || !site.contactNote.includes('GitHub')) fail('site.contactNote')

const nav = [
  ['/', '首页｜Home'],
  ['/work', '工作｜Work'],
  ['/about', '关于｜About'],
]
if (!Array.isArray(site.nav) || site.nav.length !== nav.length) fail('nav length')
site.nav.forEach((item, i) => {
  if (item.to !== nav[i][0] || item.label !== nav[i][1]) fail(`nav[${i}]`)
})

if (!Array.isArray(site.principles) || site.principles.length !== 3) fail('principles')
for (const item of site.principles) {
  for (const key of ['title', 'titleEn', 'body']) {
    if (typeof item[key] !== 'string' || item[key].trim().length < 2) fail(`principle.${key}`)
  }
}

const about = read('content/about.md')
if (about.length < 80) fail('about length')
if (!about.includes('https://github.com/viananJune')) fail('about github')
if (/@/.test(about)) fail('about should not publish an email')

const expected = [
  {
    file: 'head-account-timeline.md',
    slug: 'head-account-timeline',
    index: '01',
    needles: ['48', 'xlsx', '标题中文', '简介中文', '早间摘要'],
  },
  {
    file: 'overseas-morning-brief.md',
    slug: 'overseas-morning-brief',
    index: '02',
    needles: ['06:00', 'Asia/Shanghai', '既有 SOP', '编排', '同步'],
  },
  {
    file: 'agent-workbench.md',
    slug: 'agent-workbench',
    index: '03',
    needles: ['例程', 'Windows', '中英'],
  },
]

const dir = join(root, 'content/cases')
const files = readdirSync(dir).filter((name) => name.endsWith('.md')).sort()
const expectedFiles = expected.map((item) => item.file).sort()
if (files.join() !== expectedFiles.join()) fail(`case files ${files.join()}`)

const sections = ['## Problem', '## Approach', '## Outcome', '## Stack']
const banned = [/发明\s*FanShifu/, /创建\s*了?\s*FanShifu/, /原创\s*FanShifu/, /FanShifu\s*核心/]

function frontmatter(raw, file) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) fail(`frontmatter ${file}`)
  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
    data[key] = value
  }
  return { data, body: match[2] }
}

for (const spec of expected) {
  const raw = read(`content/cases/${spec.file}`)
  const { data, body } = frontmatter(raw, spec.file)
  if (data.slug !== spec.slug) fail(`${spec.file} slug`)
  if (data.index !== spec.index) fail(`${spec.file} index`)
  if (!data.title || data.title.length < 2) fail(`${spec.file} title`)
  if (!data.titleEn || data.titleEn.length < 4) fail(`${spec.file} titleEn`)
  if (!data.summary || data.summary.length < 16) fail(`${spec.file} summary`)
  let cursor = 0
  for (const heading of sections) {
    const at = body.indexOf(heading, cursor)
    if (at === -1) fail(`${spec.file} missing ${heading}`)
    cursor = at + heading.length
  }
  for (const needle of spec.needles) {
    if (!raw.includes(needle)) fail(`${spec.file} missing ${needle}`)
  }
  for (const pattern of banned) {
    if (pattern.test(raw)) fail(`${spec.file} banned claim ${pattern}`)
  }
}

const corpus = [about, JSON.stringify(site), ...expected.map((item) => read(`content/cases/${item.file}`))].join('\n')
for (const pattern of banned) {
  if (pattern.test(corpus)) fail(`banned claim ${pattern}`)
}

console.log(`content check ok: ${expected.length} cases`)
