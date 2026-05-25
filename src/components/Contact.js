// Contact.js
import React, { useState } from 'react';
import { bookAppointment } from '../api';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    productType: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await bookAppointment(formData);
      setSubmitted(true);
      setFormData({ 
        name: '', 
        phone: '', 
        email: '', 
        message: '',
        preferredDate: '',
        preferredTime: '',
        productType: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappNumber = '919872228109';
  const whatsappMessage = encodeURIComponent("Hello Balaji Enterprises, I'm interested in your premium mattresses, office chairs, and plastic chairs. I would like to know more about your products and services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-badge2">Balaji Enterprises | Since 1995</div>
          <div className="hero-icon">✨</div>
          <h1>Contact <span>Balaji Enterprises</span></h1>
          <p>Your trusted partner for premium mattresses, ergonomic office chairs, and durable plastic chairs</p>
          <div className="hero-buttons">
            <a href="tel:+919872228109" className="hero-call-btn">
              📞 Call Now: +91 98722 28109
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hero-wa-btn">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Our Experts</h3>
              <p><strong>
              <a href="tel:+919872228109">+91 98722 28109</a>

              </strong></p>
              <small>Mon-Sat, 10 AM - 7 PM</small>
              <small>Sunday: By Appointment Only</small>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>WhatsApp Support</h3>
              <p><strong>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </strong></p>
              <small>Quick responses for queries</small>
              <small>Share your requirements</small>
            </div>
            <div className="info-card">
              <div className="info-icon">🏭</div>
              <h3>Premium Quality</h3>
              <p><strong>Visit Our Showroom</strong><br />
              Experience our premium collections<br />
              Get personalized consultation</p>
              <small>Free product demonstration</small>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <div className="form-info">
              <div className="form-info-badge">Free Consultation</div>
              <h2>Book Your <span>Product Consultation</span></h2>
              <p>Schedule a free consultation with our furniture experts at Balaji Enterprises Showroom. Get personalized recommendations based on your comfort and durability needs.</p>
              <div className="benefits-list">
                <h4>Why book with Balaji Enterprises:</h4>
                <ul>
                  <li>✓ Free product demonstration</li>
                  <li>✓ Try our premium collections</li>
                  <li>✓ Expert guidance & recommendations</li>
                  <li>✓ Exclusive consultation offers</li>
                  <li>✓ Free delivery & installation</li>
                  <li>✓ 10 Year warranty</li>
                  <li>✓ Premium quality materials</li>
                </ul>
              </div>

            </div>

            <div className="form-wrapper">
              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  Consultation booked successfully! Our expert will contact you within 24 hours at <strong>{formData.phone}</strong>.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name <span>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number <span>*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Which product type interests you?</label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                  >
                    <option value="">Select product type</option>
                    <option value="mattress">🛌 Premium Mattresses</option>
                    <option value="office_chair">💺 Ergonomic Office Chairs</option>
                    <option value="plastic_chair">🪑 Heavy Duty Plastic Chairs</option>
                    <option value="executive">👔 Executive Collection</option>
                    <option value="visitor">👥 Visitor Chairs</option>
                    <option value="not_sure">Not sure - Need consultation</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="">Select time slot</option>
                      <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                      <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                      <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                      <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                      <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                      <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                      <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tell us about your requirements</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Share your requirements, preferences, or specific needs. Our experts will help you find the perfect furniture solution."
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner"></span> Booking...
                    </>
                  ) : (
                    'Schedule Free Consultation →'
                  )}
                </button>
              </form>

              <div className="form-footer-note">
                <p>✨ Our experts will contact you within 24 hours to confirm your appointment and understand your requirements better.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Updated with new map embed */}
      <section className="map-section">
        <div className="container">
          <div className="section-badge">Visit Us</div>
          <h2>Find Our <span>Showroom</span></h2>
          <p className="map-subtitle">Near Chugli Ghar, J.K. Road, Mansa (151505), Punjab, India</p>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d215.9830979618497!2d75.39668184568879!3d29.987201013334253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1779207290978!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Balaji Enterprises Showroom Location"
            ></iframe>
          </div>
          <div className="map-directions">
            <a 
              href="https://maps.google.com/?q=Near+Ganga+Oil+Mill+Mansa+Punjab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-btn"
            >
              🗺️ Get Directions to Showroom →
            </a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-directions-btn"
            >
              💬 Ask for Directions on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="contact-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🛌</span>
              <div>
                <h4>Premium Mattresses</h4>
                <p>Orthopedic & memory foam</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💺</span>
              <div>
                <h4>Ergonomic Chairs</h4>
                <p>Office & executive collection</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🪑</span>
              <div>
                <h4>Plastic Chairs</h4>
                <p>Heavy duty & durable</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🏭</span>
              <div>
                <h4>Made in India</h4>
                <p>Since 1995</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <div>
                <h4>50,000+ Customers</h4>
                <p>Happy & satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;