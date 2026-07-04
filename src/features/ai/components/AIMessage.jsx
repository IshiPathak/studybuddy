import ReactMarkdown from "react-markdown"
import SummaryCard from "./SummaryCard"
import FlashcardViewer from "./FlashcardViewer"
import QuizViewer from "./QuizViewer"
import NotesViewer from "./NotesViewer"

function AIMessage({ msg }) {

  if (msg.sender === "user") {

    return (
      <>
        <strong>You</strong>

        <ReactMarkdown>
          {msg.text}
        </ReactMarkdown>
      </>
    )

  }

  switch (msg.type) {

    case "summary":

        return (
        <SummaryCard
            title={msg.title}
            content={msg.content}
        />
        )

    case "notes":

        return (
        <NotesViewer
            title={msg.title}
            sections={msg.sections}
        />
        )

    case "flashcards":

        return (
        <FlashcardViewer
            title={msg.title}
            cards={msg.cards}
        />
        )

    case "quiz":

        return (
        <QuizViewer
            title={msg.title}
            questions={msg.questions}
        />
        )

    default:

        return (
        <>
            <strong>StudyBuddy</strong>

            <ReactMarkdown>
            {msg.content}
            </ReactMarkdown>
        </>
        )

    }

}

export default AIMessage