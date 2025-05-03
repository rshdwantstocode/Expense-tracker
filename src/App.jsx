import { useState } from 'react'
import Header from './Components/Header'
import Body from './Components/Body'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Body />
    </>
  )
}

export default App
