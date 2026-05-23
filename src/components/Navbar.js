// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const phoneNumber = '+919872228109';
  const whatsappNumber = '919872228109';
  const whatsappMessage = encodeURIComponent("Hello Balaji Enterprises, I'm interested in your premium mattresses, office chairs, and plastic chairs. I'd like to know more about your products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
        <div className="logo-icon">
  <img
    src="https://i.postimg.cc/G3sSFqGg/871986e1-b18c-470c-8265-4a4ab45e1906.png"
    alt="Balaji Enterprise Logo"
    className="logo-image"
  />
</div>
          <div className="logo-text">
            <span className="logo-main">BALAJI ENTERPRISES</span>
            <span className="logo-sub">Mittal Seating & Sleep Solutions</span>
          </div>
        </Link>
        
        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/" onClick={closeMenu} end>Home</NavLink></li>
          <li><NavLink to="/products" onClick={closeMenu}>Products</NavLink></li>
          <li><NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
          <li className="mobile-contact">
            <a href={`tel:${phoneNumber}`} className="mobile-phone-btn">
              📞 {phoneNumber}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mobile-wa-btn">
              💬 WhatsApp
            </a>
          </li>
        </ul>
        
        <div className="nav-contact">
          <a href={`tel:${phoneNumber}`} className="phone-btn">
            📞 {phoneNumber}
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp">
            💬
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;