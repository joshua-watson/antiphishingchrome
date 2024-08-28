function getEmailContent() {
  // Extract email content from the page (e.g., Gmail). This is a simplified example.
  let emailText = document.body.innerText;
  return emailText;
}

function preprocessText(text) {
  // Tokenize the text as needed by your model.
  let tokenizedText = text.split(/\s+/); // Example tokenization (split by whitespace)
  return tokenizedText; // Returns an array of tokens
}

// Message listener to trigger phishing detection
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'TEXT_CLICKED') {
    const emailText = getEmailContent();
    const tokenizedText = preprocessText(emailText);
    sendResponse({ processedText: tokenizedText });
  }
});