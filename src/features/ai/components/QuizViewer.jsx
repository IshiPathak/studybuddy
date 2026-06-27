import { useState } from "react"
import StudyCard from "./StudyCard"

function QuizViewer({
  title,
  questions
}) {

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const question = questions[current]

  return (

    <StudyCard>

      <h3>✅ {title}</h3>

      <p>
        Question {current + 1} / {questions.length}
      </p>

      <h4 className="quiz-question">
        {question.question}
      </h4>

      {question.options.map((option, index) => (

        <button
        key={index}
        className={`quiz-option
            ${
            showAnswer &&
            index === question.answer
                ? "correct"
                : ""
            }
            ${
            showAnswer &&
            selected === index &&
            index !== question.answer
                ? "wrong"
                : ""
            }
            ${
            !showAnswer &&
            selected === index
                ? "selected"
                : ""
            }`}
        disabled={showAnswer}
        onClick={() => setSelected(index)}
        >
        {option}
        </button>

      ))}

      {showAnswer && (

        <div className="quiz-answer">

          <p>

            <strong>
              Correct Answer:
            </strong>

            {" "}
            {question.options[question.answer]}

          </p>

          <p>
            {question.explanation}
          </p>

        </div>

      )}

      <div className="quiz-buttons">

        <button
          className="action-btn"
          disabled={current === 0}
          onClick={() => {

            setCurrent(current - 1)
            setSelected(null)
            setShowAnswer(false)

          }}
        >
          ← Previous
        </button>

        <button
          className="action-btn"
          disabled={selected === null}
          onClick={() =>
            setShowAnswer(true)
          }
        >
          Check
        </button>

        <button
          className="action-btn"
          disabled={
            current === questions.length - 1
          }
          onClick={() => {

            setCurrent(current + 1)
            setSelected(null)
            setShowAnswer(false)

          }}
        >
          Next →
        </button>

      </div>

    </StudyCard>

  )

}

export default QuizViewer