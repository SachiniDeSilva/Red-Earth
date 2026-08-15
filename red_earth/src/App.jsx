import { useState } from 'react'

import './App.scss'
import Header from './components/Header'
import Banner from './pages/Banner/banner'
import OurStory from './pages/Our_story/ourStory'
import Shop from './pages/Shop/shop'
import Degustation from './pages/Degustation/degustation'
import Contact from './pages/ContactUs/contact'
import FooterBanner from './pages/FooterBanner/footerBanner'
import Footer from './pages/Footer/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Banner />
      <OurStory/>

  
        <Shop />
      
      <Degustation />
      <Contact />
      <FooterBanner />
      <Footer />
    </>
  )
}

export default App
