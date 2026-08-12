import React from 'react'
import './ourStory.scss'
import storyImg from '../../assets/istockphoto-1829241109-612x612.jpg'

export default function OurStory() {
  return (
    <section className="our-story" id="our-story">
      <div className="story-inner">
        <div className="story-media">
          <img src={storyImg} alt="Australian landscape" />
          <div className="accent-square" />
        </div>

        <div className="story-content">
          <div className="kicker">§ 01 — OUR STORY</div>
          <h2 className="headline">Rooted in Country, <em>grown with intention.</em></h2>

          <p>
            Red Earth Kitchen was born from a conviction that Australia's culinary identity deserves a seat at the world's finest tables. Our chefs source directly from small-scale Victorian farms, Torres Strait seafood co‑ops, and Aboriginal‑owned native ingredient growers.
          </p>

          <p>
            No airfreight. No imported shortcuts. Every dish on our menu changes with the season — sometimes with the week. The chalkboard in our kitchen reflects what arrived at the back door this morning, nothing more.
          </p>

          <div className="stats">
            <div className="stat"><div className="num">12+</div><div className="label">Local Producers</div></div>
            <div className="stat"><div className="num">5</div><div className="label">Years in Melbourne</div></div>
            <div className="stat"><div className="num">100%</div><div className="label">Australian Sourced</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
