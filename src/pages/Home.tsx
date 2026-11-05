import { Link } from 'react-router-dom'
import { cases, site } from '../lib/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Home() {
  useDocumentTitle(undefined, `${site.name} — ${site.sloganCn}`)

  return (
    <>
      <section className="masthead">
        <div className="wrap masthead-grid">
          <div>
            <p className="kicker">Portfolio</p>
            <h1>{site.name}</h1>
            <p className="slogan-cn">{site.sloganCn}</p>
            <p className="slogan-en" lang="en">
              {site.sloganEn}
            </p>
          </div>
          <div>
            <p className="lede">{site.intro}</p>
            <div className="actions">
              <Link className="button" to="/work">
                查看工作
              </Link>
              <a className="button button-quiet" href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap section">
          <div className="section-head">
            <h2>三件在用的工作</h2>
            <Link to="/work">工作索引</Link>
          </div>
          <ol className="work-list">
            {cases.map((item) => (
              <li key={item.slug}>
                <Link className="work-row" to={`/work/${item.slug}`}>
                  <span className="index">{item.index}</span>
                  <span className="work-copy">
                    <span className="work-title">{item.title}</span>
                    <span className="work-en" lang="en">
                      {item.titleEn}
                    </span>
                    <span className="work-summary">{item.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="wrap section">
          <div className="section-head">
            <h2>怎样放进这页</h2>
          </div>
          <ol className="principles">
            {site.principles.map((item, index) => (
              <li key={item.title}>
                <p className="index">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p className="work-en" lang="en">
                  {item.titleEn}
                </p>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
