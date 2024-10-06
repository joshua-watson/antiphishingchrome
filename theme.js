// Apply the dark mode or light mode before loading the page to prevent white flash
(function() {
    chrome.storage.sync.get('darkMode', function(data) {
        if (data.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });
})();

// Add transition class only after the page loads to prevent visual flash
document.addEventListener('DOMContentLoaded', function () {
    // Add the class to enable transition for smooth theme switching
    document.documentElement.classList.add('theme-transition');

    // Handle the dark mode toggle switch
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            const darkMode = this.checked;
            applyDarkMode(darkMode);
            chrome.storage.sync.set({ darkMode: darkMode });
        });
    }

    // Function to set dark or light mode
    function applyDarkMode(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
});
