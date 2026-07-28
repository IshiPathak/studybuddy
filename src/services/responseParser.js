export function parseAIResponse(response) {
  let cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // If it doesn't look like JSON, treat it as markdown immediately
  if (!cleaned.startsWith("{")) {
    return {
      type: "markdown",
      content: cleaned,
    };
  }

  try {
    const parsed = JSON.parse(cleaned);

    switch (parsed.type) {
      case "summary":
      case "flashcards":
      case "quiz":
      case "notes":
        return parsed;

      default:
        throw new Error("Unknown response type");
    }
  } catch (error) {
    console.error("Invalid JSON:", error);

    return {
      type: "markdown",
      content: cleaned,
    };
  }
}