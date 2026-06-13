function CustomTimer({
  studyMinutes,
  setStudyMinutes,
  breakMinutes,
  setBreakMinutes,
  totalSessions,
  setTotalSessions,
  applySettings,
  setShowSettings
}) {
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

          <button
            onClick={() => setShowSettings(false)}
          >
            ← Back
          </button>

        </div>

      </div>

    </div>
  )
}

export default CustomTimer