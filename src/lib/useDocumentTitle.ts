import { useEffect } from 'react'

export function useDocumentTitle(page?: string, description?: string) {
  useEffect(() => {
    document.title = page ? `${page} · Yanan Wei` : 'Yanan Wei'
    if (!description) return
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [page, description])
}
