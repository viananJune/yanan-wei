import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../lib/content'

export function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="shell">
      <a className="skip" href="#content">
        跳到正文
      </a>
      <header className="header">
        <div className="wrap header-bar">
          <NavLink to="/" className="brand" end>
            <span className="seal" aria-hidden="true">
              Y
            </span>
            <span>{site.name}</span>
          </NavLink>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? '关闭' : '目录'}
          </button>
          <nav id="site-nav" className={open ? 'nav is-open' : 'nav'} aria-label="主导航">
            {site.nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main id="content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <p className="footer-name">{site.name}</p>
            <p>{site.sloganCn}</p>
            <p lang="en">{site.sloganEn}</p>
          </div>
          <div>
            <p className="footer-links">
              {site.nav.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              ))}
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </p>
            <p className="colophon">静态页面 · 无追踪 · 联系仅 GitHub</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
