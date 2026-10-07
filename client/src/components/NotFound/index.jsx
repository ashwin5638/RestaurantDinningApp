import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiSearch } from 'react-icons/fi'
import { FaUtensils } from 'react-icons/fa'
import Navigation from '../Navigation'
import Footer from '../Footer'
import { useSeo } from '../../services/seo'
import './index.css'

const suggestions = [
  { label: 'Home', path: '/home' },
  { label: 'Menu', path: '/menucard' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Book a Table', path: '/book' }
]

const NotFound = () => {
  const location = useLocation()
  const notFoundUrl = typeof window !== 'undefined' ? window.location.href : ''

  useSeo({
    title: 'Page Not Found (404) | Savory',
    description:
      'The page you are looking for does not exist or has been moved. Return home or browse the Savory menu.',
    robots: 'noindex, follow',
    canonical: notFoundUrl
  })

  return (
    <>
      <Navigation />

      <main className='notfound-page'>
        <div className='notfound-card'>
          <div className='notfound-plate' role='img' aria-label='Error 404'>
            <span className='plate-rim' aria-hidden='true' />
            <span className='plate-center'>
              <FaUtensils className='plate-utensils' aria-hidden='true' />
              <span className='notfound-code'>404</span>
            </span>
          </div>

          <h1 className='notfound-title'>This page is off the menu</h1>

          <p className='notfound-text'>
            We could not find{' '}
            <code className='notfound-path'>{location.pathname}</code>. The link
            may be out of date, or the page may have moved.
          </p>

          <div className='notfound-actions'>
            <Link to='/home' className='notfound-btn primary'>
              <FiHome aria-hidden='true' />
              Back to home
            </Link>
            <Link to='/menucard' className='notfound-btn ghost'>
              <FiSearch aria-hidden='true' />
              Browse the menu
            </Link>
          </div>

          <nav className='notfound-links' aria-label='Popular pages'>
            <p className='notfound-links-label'>Popular pages</p>
            <ul>
              {suggestions.map(item => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default NotFound
