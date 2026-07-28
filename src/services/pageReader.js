export async function getCurrentPage() {
  const tabs = await chrome.tabs.query({});

  console.log("ALL TABS:");
  console.table(
    tabs.map(t => ({
      id: t.id,
      active: t.active,
      windowId: t.windowId,
      title: t.title,
      url: t.url,
    }))
  );

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  console.log("SELECTED TAB:", tab);

  return null;
}