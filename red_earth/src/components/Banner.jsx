import React from 'react'
import './Banner.scss'
import hero from '../assets/hero.png'

function Banner() {
  return (
    <section className="hero-banner" style={{ backgroundImage: `url(${hero})` }}>
      <div className="overlay" />
      <div className="container">
        <div className="kicker">MODERN AUSTRALIAN · EST. 2019 · MELBOURNE, VIC</div>
        <h1 className="title">
          Where the bush
          <br />
          meets the table.
        </h1>
        <p className="subtitle">
          Seasonal produce, native ingredients, and the unhurried spirit of the Australian
          landscape — served in the heart of Melbourne.
        </p>

        <div className="actions">
          <button className="btn primary">RESERVE YOUR TABLE <span className="arr">→</span></button>
          <button className="btn outline">VIEW MENU</button>
        </div>
      </div>

      <div className="scroll-indicator">SCROLL <span className="chev">›</span></div>
      <div className="announce">NOW SERVING WINTER DEGUSTATION — 7 COURSES · $145 PER PERSON · BOOKINGS ESSENTIAL</div>
    </section>
  )
}

export default Banner
