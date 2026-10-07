import { useEffect } from 'react'

const DEFAULT_TITLE = 'Savory — Seasonal Fine Dining'
const DEFAULT_DESCRIPTION =
  'Savory — seasonal fine dining. Browse our menu, read our story and book a table online.'

const getMeta = (key, attr = 'name') => {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`)
  return el ? el.getAttribute('content') : null
}

const setMeta = (key, content, attr = 'name') => {
  if (!content) return

  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const getCanonical = () => {
  const el = document.head.querySelector('link[rel="canonical"]')
  return el ? el.getAttribute('href') : null
}

const setCanonical = href => {
  if (!href) return

  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps document-level SEO tags in sync for the current page:
 * <title>, description, robots, Open Graph and canonical URL.
 * Defaults from index.html are restored when the page unmounts, so a
 * `noindex` set by a 404 page never leaks onto the rest of the site.
 */
export const useSeo = ({ title, description, robots, canonical }) => {
  useEffect(() => {
    const previous = {
      title: document.title,
      description: getMeta('description'),
      robots: getMeta('robots'),
      canonical: getCanonical()
    }

    if (title) document.title = title

    setMeta('description', description)
    setMeta('robots', robots)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')

    setCanonical(
      canonical ||
        (typeof window !== 'undefined' ? window.location.href : undefined)
    )

    return () => {
      document.title = previous.title || DEFAULT_TITLE
      setMeta('description', previous.description || DEFAULT_DESCRIPTION)
      setMeta('robots', previous.robots || 'index, follow')
      setMeta('og:title', previous.title || DEFAULT_TITLE, 'property')
      setMeta(
        'og:description',
        previous.description || DEFAULT_DESCRIPTION,
        'property'
      )
      if (previous.canonical) setCanonical(previous.canonical)
    }
  }, [title, description, robots, canonical])
}
