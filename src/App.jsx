import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header'
import Body from './Components/Body'
import './App.css'

function App() {
  return (
    <Router>
      <>
        <Header />
        <Body />
      </>
    </Router>
  )
}

export default App
