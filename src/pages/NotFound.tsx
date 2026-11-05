import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('未找到')

  return (
    <div className="wrap page narrow">
      <PageHeader kicker="404" title="这一页不在站里" lede="链接可能写错了。工作索引里有三篇案例。" />
      <p className="actions">
        <Link className="button" to="/">
          回首页
        </Link>
        <Link className="button button-quiet" to="/work">
          去工作
        </Link>
      </p>
    </div>
  )
}
