import { useState } from 'react'

import './App.scss'
import Header from './components/Header'
import Banner from './pages/Banner/banner'
import OurStory from './pages/Our_story/ourStory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Banner />

      <OurStory />

    </>
  )
}

export default App
