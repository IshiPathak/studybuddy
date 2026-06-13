import { useState, useEffect } from "react"
import studyDone from "./assets/studyDone.mp3"
import breakDone from "./assets/breakDone.mp3"

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [studyMinutes, setStudyMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)

  const [time, setTime] = useState(studyMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  const [sessionCount, setSessionCount] = useState(1)
  const [totalSessions, setTotalSessions] = useState(4)

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

        if (sessionCount >= totalSessions) {

          setIsRunning(false)

          alert("All study sessions completed! 🎉")

          return
        }

        setSessionCount(prev => prev + 1)

        setTime(studyMinutes * 60)

        setIsBreak(false)

      } else {

        new Audio(studyDone).play()

        setTime(breakMinutes * 60)

        setIsBreak(true)

      }

    }

    return () => clearInterval(timer)

  }, [isRunning, time, isBreak, sessionCount, totalSessions, studyMinutes, breakMinutes])



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
    setTime(studyMinutes * 60)
    setSessionCount(1)
    setIsBreak(false)
  }
  function applySettings() {

  if (!isBreak) {
    setTime(studyMinutes * 60)
  }

}


  if (showSettings) {
  return (
    <div className="settings-page container">
      <div className="timer-card">

        <h1>⚙️ Custom Timer</h1>

        <div>

          <p>Study Minutes</p>
          <input
            type="number"
            min="1"
            value={studyMinutes}
            onChange={(e) =>
              setStudyMinutes(Number(e.target.value))
            }
          />

          <p>Break Minutes</p>
          <input
            type="number"
            min="1"
            value={breakMinutes}
            onChange={(e) =>
              setBreakMinutes(Number(e.target.value))
            }
          />

          <p>Sessions</p>
          <input
            type="number"
            min="1"
            value={totalSessions}
            onChange={(e) =>
              setTotalSessions(Number(e.target.value))
            }
          />

        </div>

        <div className="settings-buttons">

          <button
            onClick={() => {
              applySettings()
              setShowSettings(false)
            }}
          >
            Save Changes
          </button>

          <button onClick={() => setShowSettings(false)}>
            ← Back
          </button>

        </div>
      </div>
    </div>
  )
}
  return (
    <div className="container">

      <div className="timer-card">

        <h1>StudyBuddy</h1>
        
        <p>
          Session {sessionCount}/{totalSessions}
        </p>

        <h3>
          {isBreak ? "Break Time ☕" : "Focus Time 📚"}
        </h3>

        <h2>{formatTime()}</h2>

        <div className="buttons">

          <button
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>

          <button onClick={handlePause}>
            Pause
          </button>

          <button onClick={handleReset}>
            Reset
          </button>
        </div>
        <button
          className="settings-btn"
          onClick={() => setShowSettings(true)}
        >
          ⚙️ Custom Timer
        </button>

      </div>

    </div>
  )
}

export default App