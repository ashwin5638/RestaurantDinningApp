import { FaInstagram } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { FaTwitter } from 'react-icons/fa'
import './index.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 className="footer-logo">SAVORY</h2>
          <p className="footer-tagline">
            Where culinary artistry meets timeless elegance. A dining experience beyond compare.
          </p>
          <div className="footer-social">
            <a href="/home" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="/home" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
            <a href="/home" aria-label="Twitter"><FaTwitter size={20} /></a>
          </div>
        </div>

        <div className="footer-nav">
          <h3 className="footer-col-title">NAVIGATE</h3>
          <a href="/#">About</a>
          <a href="/#">Menu</a>
          <a href="/#">Gallery</a>
          <a href="/book">Reservations</a>
        </div>

        <div className="footer-contact">
          <h3 className="footer-col-title">CONTACT</h3>
          <p>Hyderabad, Near IB</p>
          <p>+91 98765 43287</p>
          <p>reservations@savory.in</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Savory. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
