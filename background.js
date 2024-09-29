chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'paste-text') {
        // Save the copied text to chrome storage
        chrome.storage.local.set({ pastedText: request.content });
    }

    if (request.action === 'scan-email') {
        fetch('http://0.0.0.0:5000/predict', {  // Replace with your correct IP if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_content: request.content })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Send the result back to popup.js
            sendResponse({ result: data });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ result: { prediction: 'Error', confidence: 0 } });
        });

        return true;  // Required to keep the sendResponse function valid after async
    }

    // Open the popup and trigger the scan
    if (request.action === 'open-popup-and-scan') {
        chrome.action.openPopup(() => {
            chrome.runtime.sendMessage({ action: 'trigger-scan' });  // Trigger scan in popup.js
        });
    }
});
