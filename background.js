chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'scan-email') {
        const emailContent = request.content;

        // Get the threshold value from Chrome storage
        chrome.storage.local.get('threshold', function (data) {
            const threshold = data.threshold || 0;  // Default to 0 if no threshold is set

            // Send the email content and threshold to the Flask API
            fetch('http://192.168.0.241:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_content: emailContent, threshold: threshold }),
            })
                .then(response => response.json())
                .then(data => {
                    // Send the prediction result back to popup.js
                    sendResponse({ result: data });
                })
                .catch(error => {
                    console.error('Error:', error);
                    sendResponse({ error: 'Failed to scan the email content' });
                });
        });

        // Return true to indicate asynchronous response
        return true;
    }

    // Open the popup and trigger the scan
    if (request.action === 'open-popup-and-scan') {
        chrome.action.openPopup(() => {
            chrome.runtime.sendMessage({ action: 'trigger-scan' });  // Trigger scan in popup.js
        });
    }
});
