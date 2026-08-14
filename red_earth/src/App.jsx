import { useState } from 'react'

import './App.scss'
import Header from './components/Header'
import Banner from './pages/Banner/banner'
import OurStory from './pages/Our_story/ourStory'
import Shop from './pages/Shop/shop'
import Degustation from './pages/Degustation/degustation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Banner />
      <OurStory/>

  
        <Shop />
      
      <Degustation />
    </>
  )
}

export default App
