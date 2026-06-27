import { useState } from "react"
import StudyCard from "./StudyCard"

function FlashcardViewer({
  title,
  cards
}) {

  const [current, setCurrent] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const card = cards[current]

  return (
    <StudyCard>

      <h3>📚 {title}</h3>

      <p className="flashcard-count">
        Card {current + 1} / {cards.length}
      </p>

      <div
        className="flashcard"
        onClick={() =>
          setShowAnswer(!showAnswer)
        }
      >

        {showAnswer ? (
          <p>{card.answer}</p>
        ) : (
          <p>{card.question}</p>
        )}

        <p className="flashcard-hint">
          {showAnswer
            ? "Tap card to show question"
            : "Tap card to reveal answer"}
        </p>

      </div>

      <div className="flashcard-buttons">

        <button
          className="action-btn"
          disabled={current === 0}
          onClick={() => {
            setCurrent(current - 1)
            setShowAnswer(false)
          }}
        >
          ← Previous
        </button>

        <button
          className="action-btn"
          disabled={current === cards.length - 1}
          onClick={() => {
            setCurrent(current + 1)
            setShowAnswer(false)
          }}
        >
          Next →
        </button>

      </div>

    </StudyCard>
  )

}

export default FlashcardViewer