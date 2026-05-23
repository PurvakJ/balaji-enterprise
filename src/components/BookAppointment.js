import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bookAppointment } from '../api';
import './BookAppointment.css';

function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    appointmentType: 'showroom'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookAppointment(formData);
      setSubmitted(true);
      setFormData({ 
        name: '', 
        phone: '', 
        email: '', 
        preferredDate: '',
        preferredTime: '',
        message: '',
        appointmentType: 'showroom'
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Sorry, there was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="appointment-success">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Appointment Booked Successfully!</h2>
          <p>Thank you for choosing Cuddle Cloud Premium Mattresses.</p>
          <p>Our sleep expert will contact you shortly at <strong>{formData.phone}</strong> to confirm your appointment.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => setSubmitted(false)}>
              Book Another Appointment
            </button>
            <Link to="/" className="btn-secondary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      {/* Hero Section */}
      <section className="appointment-hero">
        <div className="container">
          <div className="hero-badge">Cuddle Cloud Sleep Consultancy</div>
          <h1>Book a <span>Sleep Consultation</span></h1>
          <p>Schedule a personalized mattress consultation at our experience center or request a home visit</p>
          <div className="contact-badge">
            <span>📞 Need help? Call our sleep experts: <a href="tel:+917696329012">+91 76963 29012</a></span>
          </div>
        </div>
      </section>

      <div className="appointment-container">
        <div className="container">
          <div className="appointment-grid">
            {/* Left Side - Info Cards */}
            <div className="appointment-info">
              <div className="info-card">
                <div className="card-icon">🎯</div>
                <h3>Why Book a Consultation?</h3>
                <ul>
                  <li>✓ Personalized mattress recommendation</li>
                  <li>✓ Spinal alignment assessment</li>
                  <li>✓ Test our orthopedic mattress collection</li>
                  <li>✓ Expert guidance on sleep posture</li>
                  <li>✓ Exclusive consultation offers</li>
                </ul>
              </div>

              <div className="info-card">
                <div className="card-icon">🛏️</div>
                <h3>What We Offer</h3>
                <ul>
                  <li>🛌 100% Orthopedic Mattresses</li>
                  <li>💨 Breathable & Skin-Friendly Fabric</li>
                  <li>🩺 Doctor-Recommended Support</li>
                  <li>🚚 Free Home Delivery</li>
                  <li>🛡️ 5+ Years Warranty</li>
                </ul>
              </div>

              <div className="info-card experience-card">
                <div className="card-icon">📍</div>
                <h3>Experience Center</h3>
                <p>Visit our flagship experience center to feel the Cuddle Cloud difference</p>
                <div className="address">
                  <span>📍 Cuddle Cloud Experience Center</span>
                  <span>Near Ganga Oil Mill, Mansa (151505)</span>
                  <span>Distt. Mansa (151505)
                  Punjab, India</span>
                </div>
                <div className="hours">
                  <span>🕐 Mon-Sat: 10 AM - 7 PM</span>
                  <span>✨ Sunday by appointment only</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="appointment-form-wrapper">
              <div className="form-header">
                <div className="form-icon-wrapper">
                  <span className="form-icon">📅</span>
                </div>
                <h2>Schedule Your Visit</h2>
                <p>Fill out the form below and our sleep experts will reach out within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span>*</span></label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number <span>*</span></label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Appointment Type <span>*</span></label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="appointmentType"
                          value="showroom"
                          checked={formData.appointmentType === 'showroom'}
                          onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                        />
                        <span>🏢 Showroom Visit</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="appointmentType"
                          value="home"
                          checked={formData.appointmentType === 'home'}
                          onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                        />
                        <span>🏠 Home Consultation</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date <span>*</span></label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Preferred Time</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    >
                      <option value="">Select a time slot</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                      <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                      <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                      <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                      <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Sleep Concerns / Requirements</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your sleep issues, back problems, or specific needs. Are you looking for a mattress for yourself, a couple, or a family member?"
                    rows="4"
                  />
                </div>

                <div className="form-note">
                  <p>✨ Our sleep experts will contact you within 24 hours to confirm your appointment and help you find the perfect mattress for better sleep.</p>
                </div>
                
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Booking...
                    </>
                  ) : (
                    'Schedule Consultation →'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🩺</span>
              <div>
                <h4>Doctor Recommended</h4>
                <p>Trusted by 1000+ healthcare professionals</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🇮🇳</span>
              <div>
                <h4>Made in India</h4>
                <p>Premium quality, locally crafted</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div>
                <h4>5+ Year Warranty</h4>
                <p>Comprehensive coverage</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🌟</span>
              <div>
                <h4>50,000+ Happy Sleepers</h4>
                <p>Across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookAppointment;