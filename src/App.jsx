import { useState } from "react"
import Timer from "./features/pomodoro/Timer"
import AIPage from "./features/ai/AIPage"

function App() {

  const [activeTab, setActiveTab] = useState("ai")
  return (
    <div>
      <div className="top-nav">
        <button
          onClick={() =>
            setActiveTab("ai")
          }
        >
          📚 AI
        </button>
        <button
          onClick={() =>
            setActiveTab("pomodoro")
          }
        >
          ⏰ Pomodoro
        </button>
      </div>
      {
        activeTab === "pomodoro"
          ? <Timer />
          : <AIPage />
      }
    </div>
  )
}

export default App