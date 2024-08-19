// content.js

// Function to extract email content from the page
function getEmailContent() {
    // Assuming the email content is in a specific HTML element
    const emailElement = document.querySelector('.email-body'); // Replace with actual selector
    return emailElement ? emailElement.innerText : '';
  }
  
  // Send the email content to the background script or popup for analysis
  chrome.runtime.sendMessage(
    {type: "checkEmail", content: getEmailContent()},
    (response) => {
      console.log(response.status);
    }
  );
  
  // Optionally, you could listen for results and modify the page
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "displayResult") {
      // Display the result on the page
      const resultElement = document.createElement('div');
      resultElement.textContent = `Phishing Detection Result: ${message.result}`;
      document.body.appendChild(resultElement);
    }
  });
  