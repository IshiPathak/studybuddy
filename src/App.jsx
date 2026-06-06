import { useState, useEffect } from "react"
import studyDone from "./assets/studyDone.mp3"
import breakDone from "./assets/breakDone.mp3"

function App() {

  const [time, setTime] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {

    let timer

    if (isRunning && time > 0) {

      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)

    }
    if (time === 0) {

      if (isBreak) {

        new Audio(breakDone).play()

        setTime(1500)
        setIsBreak(false)

      } else {

        new Audio(studyDone).play()

        setTime(300)
        setIsBreak(true)
      }

      setIsRunning(false)
    }

    return () => clearInterval(timer)

  }, [isRunning, time])



  function formatTime() {

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }



  function handleStart() {
    setIsRunning(true)
  }

  function handlePause() {
    setIsRunning(false)
  }

  function handleReset() {
    setIsRunning(false)
    setTime(1500)
  }



  return (
    <div className="container">

      <div className="timer-card">

        <h1>StudyBuddy</h1>

        <h2>{formatTime()}</h2>

        <div className="buttons">

          <button onClick={handleStart}>
            Start
          </button>

          <button onClick={handlePause}>
            Pause
          </button>

          <button onClick={handleReset}>
            Reset
          </button>

        </div>

      </div>

    </div>
  )
}

export default App