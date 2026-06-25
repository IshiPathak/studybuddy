import { useState, useEffect, useRef } from "react"
import { askGemini } from "../../services/gemini"
import ReactMarkdown from "react-markdown"
import {handleFileUpload} from "./utils/fileUtils"

function AIPage() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const chatEndRef = useRef(null)
  const [fileContent, setFileContent] =
  useState("")
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [chat])

  async function handleSend() {

    if (!message.trim()) return

    const userMessage = message

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
        const aiResponse =
          await askGemini(
            [
              ...chat,
              {
                sender: "user",
                text: userMessage
              }
            ],
            fileContent
          )
        setChat(prev => [
        ...prev,
        {
            sender: "ai",
            text: aiResponse
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
            text: errorMessage
          }
        ])
        console.error(error)
      }
    }

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h1>📚 StudyBuddy AI</h1>
        <p>🐰 Ask me anything about your studies!</p>
      </div>

      <div className="chat-area">

        {chat.map((msg, index) => (

          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "ai-message"
            }
          >

            <strong>
              {msg.sender === "user"
                ? "You"
                : "StudyBuddy"}
            </strong>

            <ReactMarkdown>
              {msg.text}
            </ReactMarkdown>

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
          placeholder="Ask anything..."
        />

        <div className="input-buttons">

          <label className="upload-btn">

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

          <button onClick={handleSend}>
            Send
          </button>

        </div>

      </div>

    </div>
  )
}

export default AIPage