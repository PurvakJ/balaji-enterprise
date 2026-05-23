// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Import components
import Home from './pages/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Admin from './components/Admin';
import BookAppointment from './components/BookAppointment';
import './App.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Loading Screen Component - Updated for Balaji Enterprises
function LoadingScreen({ onLoad }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);

  useEffect(() => {
    // Show letters one by one
    let index = 0;
    const lettersArray = ['B', 'A', 'L', 'A', 'J', 'I', ' ', 'E', 'N', 'T', 'E', 'R', 'P', 'R', 'I', 'S', 'E', 'S'];
    const letterInterval = setInterval(() => {
      if (index < lettersArray.length) {
        setCurrentLetterIndex(index);
        index++;
      } else {
        clearInterval(letterInterval);
      }
    }, 100);

    // After 3 seconds, start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // After 4 seconds, complete loading
    const completeTimer = setTimeout(() => {
      if (onLoad) {
        onLoad();
      }
    }, 4000);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoad]);

  // Array of letters for BALAJI ENTERPRISES
  const letters = ['B', 'A', 'L', 'A', 'J', 'I', ' ', 'E', 'N', 'T', 'E', 'R', 'P', 'R', 'I', 'S', 'E', 'S'];

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background decoration */}
      <div className="loader-background">
        <span>PREMIUM FURNITURE</span>
        <span>SINCE 1995</span>
        <span>QUALITY • TRUST • EXCELLENCE</span>
      </div>
      
      {/* Floating icons */}
      <div className="furniture-icon">🛌</div>
      <div className="furniture-icon">💺</div>
      <div className="furniture-icon">🪑</div>
      <div className="furniture-icon">🏭</div>
      <div className="furniture-icon">⭐</div>
      <div className="furniture-icon">✨</div>

      <div className="loader-content">
        {/* Logo */}
        <div className="logo-wrapper">
          <div className="loader-logo">
          <img
    src="https://i.postimg.cc/G3sSFqGg/871986e1-b18c-470c-8265-4a4ab45e1906.png"
    alt="Balaji Enterprise Logo"
    className="logo-image"
  />
          </div>
          <div className="logo-ring"></div>
          <div className="logo-ring-outer"></div>
        </div>
        
        {/* Text container with sequential letter reveal */}
        <div className="text-container">
          {letters.map((letter, index) => (
            <span 
              key={index} 
              className={`letter ${currentLetterIndex >= index ? 'revealed' : ''}`}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div className="tagline-container">
          <span className="tagline">Mittal Seating & Sleep Solutions</span>
        </div>

        {/* Loading bar */}
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div className="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Layout component that conditionally shows Navbar and Footer
function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  
  return (
    <div className="App">
      {!isAdminPage && <Navbar />}
      <main className={`main-content ${isAdminPage ? 'admin-main' : ''}`}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onLoad={handleLoadingComplete} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/products" element={
          <Layout>
            <Products />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/reviews" element={
          <Layout>
            <Reviews />
          </Layout>
        } />
        <Route path="/book-appointment" element={
          <Layout>
            <BookAppointment />
          </Layout>
        } />
        <Route path="/admin" element={
          <Layout>
            <Admin />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;