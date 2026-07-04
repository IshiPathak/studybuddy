import { useState, useEffect, useRef } from "react"
import { askAI } from "../../services/ai"
import { handleFileUpload } from "./fileUtils"
import AIMessage from "./components/AIMessage"
import QuizViewer from "./components/QuizViewer"
import { extractURL } from "./urlUtils"
import { fetchWebpage } from "../../services/urlService"

function AIPage() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [fileContent, setFileContent] = useState("")
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [chat])

  async function handleSend() {

    if (!message.trim()) return

    const userMessage = message
    let webpageContent = ""

    const url = extractURL(userMessage)

    if (url) {

      try {

        webpageContent = await fetchWebpage(url)
        console.log("WEBPAGE CONTENT:")
console.log(webpageContent.substring(0, 300))

      } catch {

        setChat(prev => [
          ...prev,
          {
            sender: "ai",
            type: "markdown",
            content: "❌ Couldn't read that webpage."
          }
        ])

        return

      }

    }

    setChat(prev => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ])

    setMessage("")

    try {

      setLoading(true)

      const aiResponse = await askAI(
        [
          ...chat,
          {
            sender: "user",
            text: userMessage
          }
        ],
        fileContent,
        webpageContent
      )

      setChat(prev => [
        ...prev,
        {
          sender: "ai",
          ...aiResponse
        }
      ])

      setLoading(false)

    } catch (error) {

      setLoading(false)

      let errorMessage = "❌ Something went wrong."

      if (error.message.includes("503")) {
        errorMessage =
          "🐰 Gemini is busy right now. Please try again in a few seconds."
      } else if (error.message.includes("429")) {
        errorMessage =
          "⚠️ API quota exceeded. Try again later."
      }

      setChat(prev => [
        ...prev,
        {
          sender: "ai",
          type: "markdown",
          content: errorMessage
        }
      ])

      console.error(error)

    }

  }

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h1>StudyBuddy AI</h1>
        <p>🐰 Ask me anything about your studies!</p>
      </div>

      <div className="chat-area">

        {chat.map((msg, index) => (

          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : msg.type === "markdown"
                ? "ai-message"
                : "study-message"
            }
          >

            <AIMessage msg={msg} />

          </div>

        ))}

        {loading && (
          <div className="ai-message">
            🐰 Thinking...
          </div>
        )}

        <div ref={chatEndRef}></div>

      </div>

      <div className="input-area">

        {file && (
          <div className="file-preview">

            <span className="file-name">
              📄 {file.name}
              {fileContent && (
                <span>
                  {" "}✓ Loaded
                </span>
              )}
            </span>

            <button
              className="remove-file-btn"
              onClick={() => {
                setFile(null)
                setFileContent("")
              }}
            >
              ✕
            </button>

          </div>
        )}

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {

              e.preventDefault()

              handleSend()

            }

          }}
          placeholder="Ask a question, paste notes, or upload a PDF/TXT..."
        />

        <div className="input-buttons">

          <label className="action-btn">

            📎 Upload

            <input
              type="file"
              accept=".pdf,.txt"
              hidden
              onChange={(e) =>
                handleFileUpload(
                  e,
                  setFile,
                  setFileContent
                )
              }
            />

          </label>

          <button
            className="action-btn"
            onClick={handleSend}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}

export default AIPage