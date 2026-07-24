import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import SummaryCard from "./SummaryCard";
import FlashcardViewer from "./FlashcardViewer";
import QuizViewer from "./QuizViewer";
import NotesViewer from "./NotesViewer";

function AIMessage({ msg }) {
  const markdownComponents = {
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };

  if (msg.sender === "user") {
    return (
      <>
        <strong>You</strong>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {msg.text}
        </ReactMarkdown>
      </>
    );
  }

  switch (msg.type) {
    case "summary":
      return (
        <SummaryCard
          title={msg.title}
          content={msg.content}
        />
      );

    case "notes":
      return (
        <NotesViewer
          title={msg.title}
          sections={msg.sections}
        />
      );

    case "flashcards":
      return (
        <FlashcardViewer
          title={msg.title}
          cards={msg.cards}
        />
      );

    case "quiz":
      return (
        <QuizViewer
          title={msg.title}
          questions={msg.questions}
        />
      );

    default:
      return (
        <>
          <strong>StudyBuddy</strong>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {msg.content}
          </ReactMarkdown>
        </>
      );
  }
}

export default AIMessage;