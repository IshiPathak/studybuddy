import express from "express"
import cors from "cors"
import axios from "axios"
import { JSDOM } from "jsdom"
import { Readability } from "@mozilla/readability"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/webpage", async (req, res) => {

  try {

    const { url } = req.body

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      },
      timeout: 10000
    })

    const dom = new JSDOM(response.data, { url })

    const reader = new Readability(dom.window.document)

    const article = reader.parse()

    let content = ""

    if (article?.textContent?.trim()) {

      console.log("✅ Using Readability")

      content = article.textContent.trim()

    } else {

      console.log("⚠️ Readability failed. Falling back to raw page text.")

      content = dom.window.document.body.textContent
        ?.replace(/\s+/g, " ")
        .trim() || ""

    }

    console.log("SERVER CONTENT:")
    console.log(content.substring(0, 300))

    res.json({
      content
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Unable to fetch webpage."
    })

  }

})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})