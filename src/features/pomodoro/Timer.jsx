import { useState, useEffect } from "react"
import studyDone from "../../assets/studyDone.mp3"
import breakDone from "../../assets/breakDone.mp3"
import TimerControls from "./TimerControls"
import CustomTimer from "./CustomTimer"
import jumpingPet from "../../assets/jump.gif"
import sleepingPet from "../../assets/sleep.gif"
import eatingPet from "../../assets/eat.gif"

function Timer() {

  const [showSettings, setShowSettings] = useState(false)

  const [studyMinutes, setStudyMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)

  const [time, setTime] = useState(studyMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
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

          setIsFinished(true)

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

  }, [
    isRunning,
    time,
    isBreak,
    sessionCount,
    totalSessions,
    studyMinutes,
    breakMinutes
  ])

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
    setIsFinished(false)
  }

  function applySettings() {

    if (!isBreak) {
      setTime(studyMinutes * 60)
    }

  }

  if (showSettings) {
    return (
      <CustomTimer
        studyMinutes={studyMinutes}
        setStudyMinutes={setStudyMinutes}
        breakMinutes={breakMinutes}
        setBreakMinutes={setBreakMinutes}
        totalSessions={totalSessions}
        setTotalSessions={setTotalSessions}
        applySettings={applySettings}
        setShowSettings={setShowSettings}
      />
    )
  }

  return (
    <div className="container">

      <div className="timer-card">

        <h1>StudyBuddy</h1>
        <img
          className="study-pet"
          src={
            isFinished
              ? eatingPet
              : isBreak
              ? sleepingPet
              : jumpingPet
          }
          alt="Study Bunny"
        />
        <p>
          Session {sessionCount}/{totalSessions}
        </p>

        <h3>
          {isBreak ? "Break Time ☕" : "Focus Time 📚"}
        </h3>

        <h2>{formatTime()}</h2>

        <TimerControls
          handleStart={handleStart}
          handlePause={handlePause}
          handleReset={handleReset}
          isRunning={isRunning}
        />

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

export default Timer