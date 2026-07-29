export async function getCurrentPage() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) return null;

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        title: document.title,
        url: window.location.href,
        content: document.body.innerText,
      }),
    });

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}