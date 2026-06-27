export function parseAIResponse(response) {

  try {

    let cleaned = response.trim()

    const start = cleaned.indexOf("{")
    const end = cleaned.lastIndexOf("}")

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1)
    }

    cleaned = cleaned
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const parsed = JSON.parse(cleaned)

    switch (parsed.type) {

      case "summary":
      case "flashcards":
      case "quiz":
      case "notes":
      case "markdown":
        return parsed

      default:
        throw new Error("Unknown response type")

    }

  } catch (error) {

    console.error(
      "Failed to parse AI response:",
      error
    )

    return {

      type: "markdown",

      content: response

    }

  }

}