import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">Red Earth Kitchen</div>

        <nav className="nav" aria-label="Primary navigation">
          <a href="#menu">MENU</a>
          <a href="#our-story">OUR STORY</a>
          <a href="#reservations">RESERVATIONS</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="cta">
          <button className="book-btn">BOOK A TABLE <span className="arrow">→</span></button>
        </div>
      </div>
    </header>
  )
}

export default Header
