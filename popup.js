document.addEventListener('DOMContentLoaded', function () {
    // Load the pasted text from storage when the popup is opened
    chrome.storage.local.get('pastedText', function (data) {
        if (data.pastedText) {
            document.getElementById('email-content').value = data.pastedText;
            chrome.storage.local.remove('pastedText');  // Clear storage after pasting
        }
    });

    // Handle "Scan Email" button click
    document.getElementById('scan-button').addEventListener('click', function () {
        const emailContent = document.getElementById('email-content').value;

        // Send the email content to the background script for model processing
        chrome.runtime.sendMessage({ action: 'scan-email', content: emailContent }, function (response) {
            const prediction = response.result.prediction;
            const confidence = response.result.confidence;

            document.getElementById('prediction-value').innerText = prediction;
            document.getElementById('confidence-value').innerText = `${confidence.toFixed(2)}%`;

            // Change color based on prediction
            if (prediction === 'Phishing') {
                document.getElementById('confidence-value').style.color = 'red';
            } else {
                document.getElementById('confidence-value').style.color = 'green';
            }
        });
    });

// Handle clicking on settings cog to go into options.html
    document.getElementById('settings-icon').addEventListener('click', function () {
        window.location.href = "options.html"; // Load the settings page in the popup itself
    });
});

//Handles the refresh extension funciton once the refresh logo is pressed 
document.getElementById('refresh-icon').addEventListener('click', function () {
    location.reload();  // Reloads only the popup, not the entire webpage
});

