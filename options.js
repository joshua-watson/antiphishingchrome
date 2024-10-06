document.addEventListener('DOMContentLoaded', function () {
    // Load the saved threshold from Chrome storage
    chrome.storage.local.get('threshold', function (data) {
        const threshold = data.threshold || 0;  // Start with 0 if no threshold is set
        document.getElementById('threshold').value = threshold;
        document.getElementById('threshold-value').textContent = threshold;

        // Update slider background to reflect the initial threshold value
        updateSliderBackground(threshold);
    });

    // Update the displayed threshold value when the slider changes
    document.getElementById('threshold').addEventListener('input', function () {
        const threshold = document.getElementById('threshold').value;
        document.getElementById('threshold-value').textContent = threshold;

        // Update slider background
        updateSliderBackground(threshold);
    });

    // Save the threshold value when the "Save" button is clicked
    document.getElementById('save-button').addEventListener('click', function () {
        const threshold = document.getElementById('threshold').value;
        chrome.storage.local.set({ threshold: threshold }, function () {
            alert('Threshold saved: ' + threshold + '%');
        });
    });

    // Load and apply dark mode setting
    chrome.storage.sync.get('darkMode', function (data) {
        if (data.darkMode) {
            document.getElementById('dark-mode-toggle').checked = true;
            setDarkMode(true);  // Apply dark mode if saved
        }
    });

    // Toggle dark mode on or off when the switch is flipped
    document.getElementById('dark-mode-toggle').addEventListener('change', function () {
        const isDark = document.getElementById('dark-mode-toggle').checked;
        chrome.storage.sync.set({ darkMode: isDark }, function () {
            setDarkMode(isDark);
        });
    });

    // Handle clicking the "Go Back" button to return to popup.html
    document.getElementById('go-back').addEventListener('click', function () {
        window.location.href = 'popup.html'; // Go back to the popup page
    });

    // Handle the refresh button functionality
    document.getElementById('refresh-icon').addEventListener('click', function () {
        location.reload();  // Reloads the settings page
    });

    // Function to set dark or light mode
    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    // Function to update the slider background based on the current threshold
    function updateSliderBackground(value) {
        const slider = document.getElementById('threshold');
        slider.style.background = `linear-gradient(to right, #007bff ${value}%, #b6bbb6 ${value}%)`;
    }
});
