import StudyCard from "./StudyCard"

function NotesViewer({
  title,
  sections
}) {

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

    </StudyCard>

  )

}

export default NotesViewer