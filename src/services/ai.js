import { GoogleGenerativeAI } from "@google/generative-ai"
import { SYSTEM_PROMPT } from "./systemPrompt"

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
})

export async function askAI(
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