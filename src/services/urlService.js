export async function fetchWebpage(url) {

  const response = await fetch(
    "http://localhost:3000/api/webpage",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        url
      })

    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch webpage")
  }

  const data = await response.json()

  return data.content

}