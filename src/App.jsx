import { useState } from "react"
import Timer from "./features/pomodoro/Timer"
import AIPage from "./features/ai/AIPage"

function App() {

  const [activeTab, setActiveTab] = useState("ai")
  return (
    <div className="app-layout">
      <div className="top-nav">
        <button
          className={`nav-tab ${activeTab === "ai" ? "active" : ""}`}
          onClick={() =>
            setActiveTab("ai")
          }
        >
          📚 AI
        </button>
        <button
          className={`nav-tab ${activeTab === "pomodoro" ? "active" : ""}`}
          onClick={() =>
            setActiveTab("pomodoro")
          }
        >
          ⏰ Pomodoro
        </button>
      </div>
      <div
        className="tab-page"
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
        className="tab-page"
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