export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker?: string
  title: string
  lede?: string
}) {
  return (
    <header className="page-header">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  )
}
