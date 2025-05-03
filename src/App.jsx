import { useState } from 'react'
import './App.css'
import Content from './components/Content'
import Header from './components/Header'

function App() {

  const [score, setScore] = useState(0);
  function handleScore(score) {
    setScore(score)
  }

  return (
    <>
      <Header score = {score}/>
      <Content changeScore = {handleScore} />
    </>
  )
}

export default App
