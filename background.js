chrome.runtime.onInstalled.addListener(() => {
  console.log("Phishing Detector installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "checkEmail") {
    // Handle email checking request
    console.log("Email check requested.");
    sendResponse({status: "Processing email..."});
  }
});
  