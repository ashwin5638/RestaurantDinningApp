import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

import './index.css'

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const location = useLocation()

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { id: 'home', label: 'Home', path: '/home' },
        { id: 'menu', label: 'Menu', path: '/menucard' },
        { id: 'about', label: 'About', path: '/about' },
        { id: 'contact', label: 'Contact', path: '/contact' },
    ]



    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <div className="nav-content">
                        {/* Logo */}
                        <Link to="/home" className="logo-container">
                            <span className="logo-text">
                                Savory
                            </span>
                            <span className="logo-dot"></span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="desktop-nav">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    className="nav-link"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button & Phone */}
                        <div className="cta-container">
                            <div className='login-cont' >
                                <Link to="/login" className="login">Login</Link>
                                <Link to="/logout" className="login">logout</Link>
                            </div>
                            <Link to="/book" className="book-btn">
                                Book a Table
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="hamburger-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <div className={`mobile-menu-sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-links">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.id}
                                to={link.path}
                                className="mobile-nav-link"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mobile-auth-links">
                            <Link to="/login" className="mobile-nav-link auth">Login</Link>
                            <Link to="/register" className="mobile-nav-link auth">Sign Up</Link>
                        </div>
                    </div>

                    <div className="mobile-cta">
                        <Link to="/book" className="book-btn full-width">
                            Book a Table
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation
