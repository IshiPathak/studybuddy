import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./systemPrompt";
import { parseAIResponse } from "./responseParser";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askAI(
  chatHistory,
  fileContent = "",
  webpageContent = "",
  currentPage = ""
) {
  const conversation = chatHistory
    .map(msg => `${msg.sender}: ${msg.text}`)
    .join("\n");

  const documentSection = fileContent
    ? `
Document:

${fileContent}
`
    : "";

  const webpageSection = webpageContent
    ? `
The following webpage has ALREADY been fetched for you.

Use ONLY this content when answering questions about the webpage.

${webpageContent}
`
    : "";

const currentPageSection = currentPage
  ? `
The user is currently viewing this webpage.

Title:
${currentPage.title}

URL:
${currentPage.url}

Content:

${currentPage.content}
`
  : "";
console.log(currentPageSection);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `
${documentSection}

${webpageSection}

${currentPageSection}

Conversation:

${conversation}
`,
      },
    ],
  });

  const response = completion.choices[0].message.content.trim();

  return parseAIResponse(response);
}