import { GoogleGenerativeAI } from "@google/generative-ai"
import { SYSTEM_PROMPT } from "./systemPrompt"
import { parseAIResponse } from "./responseParser"

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
})

export async function askAI(
  chatHistory,
  fileContent = "",
  webpageContent = ""
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

const webpageSection = webpageContent
  ? `
The following webpage has ALREADY been fetched for you.

Use ONLY this content when answering questions about the webpage.

${webpageContent}
`
  : ""
  const result = await model.generateContent(
  `${SYSTEM_PROMPT}

    ${documentSection}

    ${webpageSection}

    Conversation:

    ${conversation}`
    )

  const response = result.response.text().trim()
  return parseAIResponse(response)
}