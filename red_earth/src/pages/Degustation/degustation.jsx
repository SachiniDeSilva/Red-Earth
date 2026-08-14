import React, { useState } from 'react';
import './degustation.scss';
import restaurantImg from '../../assets/pexels-aabouden-yassir-2163228451-38795631.jpg';

export default function Degustation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserve = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="degustation" id="degustation">
      <div className="degustation__container">
        <div className="degustation__image-section">
          <img 
            src={restaurantImg} 
            alt="Elegant restaurant interior with wine bottles" 
            className="degustation__image"
          />
          <div className="degustation__image-overlay" />
        </div>

        <div className="degustation__content-section">
          <div className="degustation__content">
            <div className="degustation__kicker">§ 03 — WINTER 2026</div>
            
            <h1 className="degustation__title">The Degustation</h1>
            
            <p className="degustation__description">
              Seven courses celebrating the austere beauty of the Australian winter. Braised wallaby, truffle from the Manjimup highlands, Tasmanian sea urchin, and a dessert that tastes like wet red dirt after rain.
            </p>

            <div className="degustation__divider" />

            <div className="degustation__pricing">
              <div className="degustation__price-item">
                <span className="degustation__price-label">Price</span>
                <span className="degustation__price-value">$145 <span className="degustation__price-suffix">/ person</span></span>
              </div>
              <div className="degustation__price-item">
                <span className="degustation__price-label">Wine Pairing</span>
                <span className="degustation__price-value">+$85</span>
              </div>
            </div>

            <button className="degustation__reserve-btn" onClick={handleReserve}>
              RESERVE FOR DEGUSTATION <span className="degustation__arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="degustation__modal" onClick={closeModal}>
          <div className="degustation__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="degustation__modal-close" onClick={closeModal}>×</button>
            <h2>Reserve Your Degustation</h2>
            <form className="degustation__form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone Number" required />
              <div className="degustation__form-row">
                <input type="date" required />
                <select required>
                  <option value="">Select Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>
              <label className="degustation__checkbox">
                <input type="checkbox" />
                <span>Include wine pairing (+$85 per person)</span>
              </label>
              <textarea placeholder="Special requests or dietary restrictions..." rows="4"></textarea>
              <button type="submit" className="degustation__submit-btn">Confirm Reservation</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
