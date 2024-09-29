chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scan-email") {
    console.log("Scanning email:", message.content);
    
    // Simulate background scanning logic (e.g., model prediction)
    // Assuming a fake prediction response for demonstration
    const fakePrediction = {
      prediction: "Legitimate",  // or "Phishing"
      confidence: 92.5           // Example confidence level
    };
    
    // Send back the result
    sendResponse({ result: fakePrediction });
  } else {
    console.log("Unknown message action:", message.action);
  }

  return true; // Keep the message channel open for asynchronous response
});