import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./systemPrompt";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askGemini(
  chatHistory,
  fileContent = ""
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

Conversation:

${conversation}
`,
      },
    ],
  });

  return completion.choices[0].message.content.trim();
}