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
  currentPage = null
) {
  const conversation = chatHistory
    .map(msg => `${msg.sender}: ${msg.text}`)
    .join("\n");

  // Decide which context to send
  let contextSection = "";

  if (fileContent) {
    contextSection = `
The user uploaded a document.

IMPORTANT:
- Use ONLY this uploaded document when answering questions about the content.
- Ignore any webpage unless the user explicitly asks to compare them.

Uploaded document:

${fileContent}
`;
  } else if (webpageContent) {
    contextSection = `
The following webpage has already been fetched.

IMPORTANT:
- Use ONLY this webpage when answering.
- Do not use the current browser tab.

Webpage:

${webpageContent}
`;
  } else if (currentPage) {
    contextSection = `
The user is currently viewing this webpage.

Title:
${currentPage.title}

URL:
${currentPage.url}

Content:

${currentPage.content}
`;
  }

  console.log("========== CONTEXT SENT TO GROQ ==========");
  console.log(contextSection.substring(0, 500));
  console.log("==========================================");

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
${contextSection}

Conversation:

${conversation}
`,
      },
    ],
  });

  const response = completion.choices[0].message.content.trim();

  return parseAIResponse(response);
}