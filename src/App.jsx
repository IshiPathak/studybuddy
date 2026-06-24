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
      <div
        style={{
          display:
            activeTab === "ai"
              ? "block"
              : "none"
        }}
      >
        <AIPage />
      </div>

      <div
        style={{
          display:
            activeTab === "pomodoro"
              ? "block"
              : "none"
        }}
      >
        <Timer />
      </div>
    </div>
  )
}

export default App