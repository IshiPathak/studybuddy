import StudyCard from "./StudyCard"
import DownloadButtons from "./DownloadButtons"

function NotesViewer({
  title,
  sections
}) {
      const notesText = `${title}

    ${sections
      .map(
        section => `${section.heading}

    ${section.points.map(point => `• ${point}`).join("\n")}`
      )
      .join("\n\n")}`;

  return (

    <StudyCard>

      <h3>
        📝 {title}
      </h3>

      {sections.map((section, index) => (

        <div
          key={index}
          className="notes-section"
        >

          <h4>
            {section.heading}
          </h4>

          <div className="notes-list">

            {section.points.map((point, i) => (

              <div
                key={i}
                className="note-item"
              >
                💡 {point}
              </div>

            ))}

          </div>

        </div>

      ))}
            <DownloadButtons
        title={title}
        content={notesText}
      />

    </StudyCard>

  )

}

export default NotesViewer