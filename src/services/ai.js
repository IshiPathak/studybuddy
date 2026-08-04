import { parseAIResponse } from "./responseParser";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function askAI(
  chatHistory,
  fileContent = "",
  webpageContent = "",
  currentPage = null
) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatHistory,
      fileContent,
      webpageContent,
      currentPage,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Server error ${response.status}`);
  }

  const data = await response.json();

  return parseAIResponse(data.response);
}