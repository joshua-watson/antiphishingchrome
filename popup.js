document.getElementById('detect-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: detectPhishing // Calls the detectPhishing function in the content script
      });
  });
});