import React, { useState } from 'react';
import './contact.scss';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    guests: '2',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Reservation submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', email: '', date: '', guests: '2', specialRequests: '' });
    }, 3000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__info-section">
          <div className="contact__content">
            <div className="contact__kicker">§ 04 — RESERVATIONS</div>
            
            <h1 className="contact__title">
              Join us for <em>an evening.</em>
            </h1>

            <p className="contact__description">
              Tables fill quickly, especially on weekends. We recommend booking at least one week in advance. Walk-ins are welcome at the bar.
            </p>

            <div className="contact__divider" />

            <div className="contact__hours">
              <div className="contact__hours-item">
                <span className="contact__hours-day">Monday – Tuesday</span>
                <span className="contact__hours-time">Closed</span>
              </div>
              <div className="contact__hours-item">
                <span className="contact__hours-day">Wednesday – Thursday</span>
                <span className="contact__hours-time">5:30 pm – 10:00 pm</span>
              </div>
              <div className="contact__hours-item">
                <span className="contact__hours-day">Friday – Saturday</span>
                <span className="contact__hours-time">12:00 pm – 10:30 pm</span>
              </div>
              <div className="contact__hours-item">
                <span className="contact__hours-day">Sunday</span>
                <span className="contact__hours-time">12:00 pm – 9:00 pm</span>
              </div>
            </div>

            <div className="contact__address">
              <span className="contact__address-icon">📍</span>
              <span>42 Flinders Lane, Melbourne VIC 3000</span>
            </div>
          </div>
        </div>

        <div className="contact__form-section">
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label className="contact__form-label">FULL NAME</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Sarah Thompson"
                className="contact__form-input"
                required
              />
            </div>

            <div className="contact__form-group">
              <label className="contact__form-label">EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sarah@example.com"
                className="contact__form-input"
                required
              />
            </div>

            <div className="contact__form-row">
              <div className="contact__form-group">
                <label className="contact__form-label">DATE</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="contact__form-input"
                  required
                />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label">GUESTS</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="contact__form-input contact__form-select"
                  required
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7">7 Guests</option>
                  <option value="8">8+ Guests</option>
                </select>
              </div>
            </div>

            <div className="contact__form-group">
              <label className="contact__form-label">SPECIAL REQUESTS</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Dietary requirements, occasion, or anything we should know..."
                className="contact__form-input contact__form-textarea"
                rows="4"
              />
            </div>

            <button type="submit" className="contact__submit-btn">
              REQUEST RESERVATION <span>→</span>
            </button>

            {submitted && (
              <div className="contact__success-message">
                ✓ Thank you! We'll confirm your reservation shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
