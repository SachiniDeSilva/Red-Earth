import React from 'react'
import './banner.scss'
import hero from '../../assets/pexels-aabouden-yassir-2163228451-38795631.jpg'

export default function Banner() {
	return (
		<section className="page-banner" style={{ backgroundImage: `url(${hero})` }}>
			<div className="banner-overlay" />
			<div className="banner-inner">
				<div className="kicker">MODERN AUSTRALIAN · EST. 2019 · MELBOURNE, VIC</div>
				<h1 className="banner-title">Where the bush<br/>meets the table.</h1>
				<p className="banner-sub">Seasonal produce, native ingredients, and the unhurried spirit of the Australian landscape — served in the heart of Melbourne.</p>

				<div className="banner-actions">
					<button className="btn primary">RESERVE YOUR TABLE <span className="arr">→</span></button>
					<button className="btn outline">VIEW MENU</button>
				</div>
			</div>

			<div className="banner-scroll">SCROLL <span className="chev">›</span></div>
			<div className="banner-announce">NOW SERVING WINTER DEGUSTATION — 7 COURSES · $145 PER PERSON · BOOKINGS ESSENTIAL</div>
		</section>
	)
}
