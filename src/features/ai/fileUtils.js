import * as pdfjsLib from "pdfjs-dist"

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString()

export async function handleFileUpload(
  event,
  setFile,
  setFileContent
) {

  const selectedFile = event.target.files[0]
  if (!selectedFile) return
  setFile(selectedFile)
  if (selectedFile.name.endsWith(".txt")) {

    const text =
        await readTextFile(selectedFile)

    setFileContent(text)

    } else if (
    selectedFile.name.endsWith(".pdf")
    ) {

    const text =
        await readPDFFile(selectedFile)

    setFileContent(text)

    }
}

export async function readTextFile(file) {
  if (!file) return ""
  const text = await file.text()
  return text
}

export async function readPDFFile(file) {

  if (!file) return ""

  const arrayBuffer = await file.arrayBuffer()

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer
  }).promise

  let text = ""

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

    const page = await pdf.getPage(pageNum)

    const content = await page.getTextContent()

    text +=
      content.items
        .map(item => item.str)
        .join(" ")

    text += "\n\n"

  }

  return text
}
