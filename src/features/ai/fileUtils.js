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
      await selectedFile.text()

    setFileContent(text)

  }

}

export async function readTextFile(file) {

  if (!file) return ""

  const text = await file.text()

  return text

}