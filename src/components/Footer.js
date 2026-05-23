// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappNumber = '919872228109';
  const whatsappMessage = encodeURIComponent("Hello Balaji Enterprises, I'm interested in your premium mattresses, office chairs, and plastic chairs. I'd like to know more about your products and services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
          <div className="logo-icon">
  <img
    src="https://i.postimg.cc/G3sSFqGg/871986e1-b18c-470c-8265-4a4ab45e1906.png"
    alt="Balaji Enterprise Logo"
    className="logo-image"
  />
</div>
            <h3>Balaji Enterprises</h3>
          </div>
          <p className="brand-tagline">Mittal Seating & Sleep Solutions</p>
          <p className="brand-description">India's most trusted destination for premium mattresses, ergonomic office chairs, and durable plastic chairs. Since 1995, we've been delivering quality furniture solutions with unmatched craftsmanship and customer satisfaction.</p>
          <div className="trust-badges">
            <span>🇮🇳 Since 1995</span>
            <span>✓ 10 Year Warranty</span>
            <span>✓ 50,000+ Happy Customers</span>
            <span>✓ Premium Quality</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/reviews">Customer Reviews</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our Collections</h3>
          <ul>
            <li><Link to="/products?category=mattress">🛌 Premium Mattresses</Link></li>
            <li><Link to="/products?category=office-chair">💺 Ergonomic Office Chairs</Link></li>
            <li><Link to="/products?category=plastic-chair">🪑 Heavy Duty Plastic Chairs</Link></li>
            <li><Link to="/products?category=executive">👔 Executive Collection</Link></li>
            <li><Link to="/products?category=visitor">👥 Visitor Chairs</Link></li>
            <li><Link to="/products">View All Products</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Visit Our Showroom</h3>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📍</span>
              <span>Near Chugli Ghar, J.K. Road, Mansa (151505)<br />Distt. Mansa, Punjab, India</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>

                <a href="tel:+919872228109">+91 98722 28109</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">🕒</span>
              <span>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: By Appointment Only</span>
            </li>
            <li>
              <span className="contact-icon">🕒</span>
              <span>GSTIN - 03AFHPM5683H1ZB</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Balaji Enterprises. All rights reserved.</p>
          <p className="footer-tagline">✦ Premium Quality | 10 Year Warranty | Trusted Since 1995 ✦</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;