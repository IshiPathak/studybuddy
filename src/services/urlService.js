export async function fetchWebpage(url) {

  const response = await fetch(
    "https://studybuddy-api-h7s7.onrender.com",
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