import aboutRaw from '../../content/about.md?raw'
import siteJson from '../../content/site.json'
import type { CaseSection, CaseStudy, SiteInfo } from '../types'

export const site = siteJson as SiteInfo
export const aboutMarkdown = aboutRaw.trim()

const caseModules = import.meta.glob('/content/cases/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const SECTION_LABEL: Record<string, { id: string; en: string; cn: string }> = {
  Problem: { id: 'problem', en: 'Problem', cn: '问题' },
  Approach: { id: 'approach', en: 'Approach', cn: '做法' },
  Outcome: { id: 'outcome', en: 'Outcome', cn: '结果' },
  Stack: { id: 'stack', en: 'Stack', cn: '技术栈' },
}

const SECTION_ORDER = ['Problem', 'Approach', 'Outcome', 'Stack']

function parseFrontmatter(raw: string, path: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) throw new Error(`Missing frontmatter: ${path}`)
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
    data[key] = value
  }
  return { data, body: match[2].trim() }
}

function parseSections(body: string, path: string): CaseSection[] {
  const chunks = body.split(/^## /m).filter(Boolean)
  const found = new Map<string, string>()
  for (const chunk of chunks) {
    const breakAt = chunk.indexOf('\n')
    const key = (breakAt === -1 ? chunk : chunk.slice(0, breakAt)).trim()
    const text = breakAt === -1 ? '' : chunk.slice(breakAt + 1).trim()
    if (!SECTION_LABEL[key]) throw new Error(`Unknown section ${key} in ${path}`)
    found.set(key, text)
  }
  return SECTION_ORDER.map((key) => {
    const text = found.get(key)
    if (!text) throw new Error(`Missing ${key} in ${path}`)
    const label = SECTION_LABEL[key]
    return { id: label.id, en: label.en, cn: label.cn, body: text }
  })
}

function parseCase(path: string, raw: string): CaseStudy {
  const { data, body } = parseFrontmatter(raw, path)
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path
  if (data.slug !== slug) throw new Error(`Slug mismatch: ${path}`)
  return {
    slug,
    index: data.index ?? '',
    title: data.title ?? slug,
    titleEn: data.titleEn ?? '',
    summary: data.summary ?? '',
    sections: parseSections(body, path),
  }
}

export const cases: CaseStudy[] = Object.entries(caseModules)
  .map(([path, raw]) => parseCase(path, raw))
  .sort((a, b) => a.index.localeCompare(b.index))

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug)
}
