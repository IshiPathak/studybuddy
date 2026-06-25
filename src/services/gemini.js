export async function askGemini(
  chatHistory,
  fileContent = ""
) {

  const conversation = chatHistory
    .map(msg =>
      `${msg.sender}: ${msg.text}`
    )
    .join("\n")

  const documentSection = fileContent
    ? `
Document:

${fileContent}
`
    : ""

  const result = await model.generateContent(
    `${SYSTEM_PROMPT}

${documentSection}

Conversation:

${conversation}`
  )

  return result.response.text()
}