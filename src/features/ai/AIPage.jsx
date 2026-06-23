import { useState, useEffect, useRef } from "react"
import { askGemini } from "../../services/gemini"
import ReactMarkdown from "react-markdown"

function AIPage() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)
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
        await askGemini([
          ...chat,
          {
            sender: "user",
            text: userMessage
          }
        ])
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

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Paste notes, ask for flashcards, summaries, quizzes..."
          rows="4"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault()
              handleSend()
            }
          }}
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>
  )
}

export default AIPage