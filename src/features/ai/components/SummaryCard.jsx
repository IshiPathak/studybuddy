import StudyCard from "./StudyCard"
import ReactMarkdown from "react-markdown"
function SummaryCard({
  title,
  content
}) {

  return (
    <StudyCard>

      <h3>
        📝 {title}
      </h3>

      <ReactMarkdown>
        {content}
      </ReactMarkdown>

    </StudyCard>
  )

}

export default SummaryCard