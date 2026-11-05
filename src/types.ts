export type NavItem = {
  to: string
  label: string
}

export type Principle = {
  title: string
  titleEn: string
  body: string
}

export type SiteInfo = {
  name: string
  sloganCn: string
  sloganEn: string
  intro: string
  github: string
  githubHandle: string
  contactNote: string
  nav: NavItem[]
  principles: Principle[]
}

export type CaseSection = {
  id: string
  en: string
  cn: string
  body: string
}

export type CaseStudy = {
  slug: string
  index: string
  title: string
  titleEn: string
  summary: string
  sections: CaseSection[]
}
