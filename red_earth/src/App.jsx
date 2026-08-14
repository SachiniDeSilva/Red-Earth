import { useState } from 'react'

import './App.scss'
import Header from './components/Header'
import Banner from './pages/Banner/banner'
import OurStory from './pages/Our_story/ourStory'
import Shop from './pages/Shop/shop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Banner />
      <OurStory/>

  
        <Shop />
    

    </>
  )
}

export default App
