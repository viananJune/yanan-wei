import { Prose } from '../components/Prose'
import { PageHeader } from '../components/PageHeader'
import { aboutMarkdown, site } from '../lib/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function About() {
  useDocumentTitle('关于', '关于 Yanan Wei。联系方式只有 GitHub。')

  return (
    <div className="wrap page narrow">
      <PageHeader kicker="About" title="关于" lede={site.contactNote} />
      <Prose markdown={aboutMarkdown} />
      <p className="actions">
        <a className="button" href={site.github} target="_blank" rel="noopener noreferrer">
          github.com/{site.githubHandle}
        </a>
      </p>
    </div>
  )
}
