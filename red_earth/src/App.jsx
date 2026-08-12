import { useState } from 'react'

import './App.scss'
import Header from './components/Header'
import Banner from './pages/Banner/banner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Banner />

    </>
  )
}

export default App
