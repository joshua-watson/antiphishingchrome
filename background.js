chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'detectPhishing') {
      try {
          // Fetch the prediction from the server or use the local model (depending on your setup)
          const response = await fetch('https://your-server-url.com/predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ tokenizedText: message.tokenizedText })
          });
          const result = await response.json();
          sendResponse({ result: result });
      } catch (error) {
          sendResponse({ error: error.message });
      }
  }
  return true; // Keeps the messaging channel open for async response
});