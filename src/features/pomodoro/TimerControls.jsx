function TimerControls({
  handleStart,
  handlePause,
  handleReset,
  isRunning
}) {
  return (
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
  )
}

export default TimerControls