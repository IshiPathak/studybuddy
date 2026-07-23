import StudyCard from "./StudyCard"
import ReactMarkdown from "react-markdown"
import DownloadButtons from "./DownloadButtons"
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
      <DownloadButtons
        title={title}
        content={content}
      />

    </StudyCard>
  )

}

export default SummaryCard