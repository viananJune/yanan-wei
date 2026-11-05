import { Link, useParams } from 'react-router-dom'
import { Prose } from '../components/Prose'
import { cases, getCase } from '../lib/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function CasePage() {
  const { slug = '' } = useParams()
  const item = getCase(slug)
  const position = cases.findIndex((entry) => entry.slug === slug)
  const previous = position > 0 ? cases[position - 1] : undefined
  const next = position >= 0 ? cases[position + 1] : undefined

  useDocumentTitle(item?.title ?? '未找到', item?.summary)

  if (!item) {
    return (
      <div className="wrap page narrow">
        <p className="kicker">Work</p>
        <h1>没有这篇案例</h1>
        <p className="lede">链接可能写错了，或案例还没有写进 content/cases。</p>
        <p className="actions">
          <Link className="button" to="/work">
            回工作索引
          </Link>
        </p>
      </div>
    )
  }

  return (
    <article className="wrap page narrow">
      <p className="back">
        <Link to="/work">工作</Link>
        <span aria-hidden="true"> / </span>
        <span className="index">{item.index}</span>
      </p>
      <header className="page-header">
        <p className="kicker" lang="en">
          {item.titleEn}
        </p>
        <h1>{item.title}</h1>
        <p className="lede">{item.summary}</p>
      </header>
      <nav className="section-nav" aria-label="案例结构">
        {item.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            <span lang="en">{section.en}</span>
            <span className="section-nav-cn">{section.cn}</span>
          </a>
        ))}
      </nav>
      {item.sections.map((section) => (
        <section key={section.id} id={section.id} className="case-section">
          <p className="kicker" lang="en">
            {section.en}
          </p>
          <h2>{section.cn}</h2>
          <Prose markdown={section.body} />
        </section>
      ))}
      <nav className="pager" aria-label="相邻案例">
        {previous ? (
          <Link to={`/work/${previous.slug}`}>
            <span className="index">上一篇</span>
            <span>{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/work/${next.slug}`}>
            <span className="index">下一篇</span>
            <span>{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
