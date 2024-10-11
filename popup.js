document.addEventListener('DOMContentLoaded', function () {
     // Load the pasted text from storage when the popup is opened
     chrome.storage.local.get('pastedText', function (data) {
        if (data.pastedText) {
            document.getElementById('email-content').value = data.pastedText;
            chrome.storage.local.remove('pastedText');  // Clear storage after pasting
        }
    });
    
    // Load and apply dark mode setting
    let isDarkMode = false; // Keep track of dark mode state
    chrome.storage.sync.get(['darkMode'], function (data) {
        if (data.darkMode) {
            isDarkMode = true;
            setDarkMode(data.darkMode);
        }
    });

   

    // Handle "Scan Email" button click
    document.getElementById('scan-button').addEventListener('click', function () {
        const emailContent = document.getElementById('email-content').value;

        // Send the email content to the background script for model processing
        chrome.runtime.sendMessage({ action: 'scan-email', content: emailContent }, function (response) {
            const prediction = response.result.prediction;
            const likelihood = response.result.likelihood;  // Use 'likelihood' instead of 'confidence'

            const predictionElement = document.getElementById('prediction-value');
            const likelihoodElement = document.getElementById('likelihood-value');  // Adjusted for likelihood

            // Update prediction and likelihood values
            predictionElement.innerText = prediction;
            likelihoodElement.innerText = `${likelihood.toFixed(2)}%`;

            // Change color based on prediction result and dark mode state
            if (prediction === 'Phishing') {
                predictionElement.style.color = isDarkMode ? '#ff6666' : 'red'; // Lighter red for dark mode
                likelihoodElement.style.color = isDarkMode ? '#ff6666' : 'red';
            } else if (prediction === 'Safe') {
                predictionElement.style.color = isDarkMode ? '#66ff66' : 'green'; // Lighter green for dark mode
                likelihoodElement.style.color = isDarkMode ? '#66ff66' : 'green';
            } else {
                predictionElement.style.color = ''; // Default color for other cases
                likelihoodElement.style.color = '';
            }
        });
    });

    // Handle clicking on the settings icon to navigate to options.html
    document.getElementById('settings-icon').addEventListener('click', function () {
        window.location.href = "options.html"; // Load the settings page in the popup itself
    });

    // Handle clicking on the refresh icon to reload the extension popup
    document.getElementById('refresh-icon').addEventListener('click', function () {
        window.location.reload();  // Reloads only the popup, not the entire webpage
    });

    // Function to set dark or light mode
    function setDarkMode(isDark) {
        if (isDark) {
            isDarkMode = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            isDarkMode = false;
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
});
