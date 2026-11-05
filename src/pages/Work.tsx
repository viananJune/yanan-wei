import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { cases } from '../lib/content'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Work() {
  useDocumentTitle('工作', 'Yanan Wei 的三件个人工作：头部账号时间线、出海早报、个人代理工作台。')

  return (
    <div className="wrap page">
      <PageHeader
        kicker="Work"
        title="工作"
        lede="三件都是自己每天会用的层。案例页按问题、做法、结果、技术栈展开。"
      />
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
  )
}
