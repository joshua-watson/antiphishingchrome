let isBacktickPressed = false;
let highlightedElements = new Set();
let copiedText = '';  // Variable to store copied content

// Listen for ` (backtick) key press
document.addEventListener('keydown', function (event) {
    if (event.key === '`') {  
        isBacktickPressed = true;
    }
});

// Listen for ` (backtick) key release
document.addEventListener('keyup', function (event) {
    if (event.key === '`') {
        isBacktickPressed = false;
    }
});

// Clear highlighting when ESC is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {  // Check for ESC key
        clearHighlighting();  // Clear highlights when ESC is pressed
    }
});

// Highlight elements when hovering while holding `
document.addEventListener('mouseover', function (event) {
    if (isBacktickPressed) {
        let target = event.target;
        if (target && isTextElement(target) && !highlightedElements.has(target)) {
            target.style.outline = '2px solid orange';
            highlightedElements.add(target);
        }
    }
});

// Copy highlighted content when ` + Click is pressed
document.addEventListener('click', function (event) {
    if (isBacktickPressed && highlightedElements.size > 0) {
        copiedText = '';  // Reset the variable

        // Gather text from all highlighted elements
        highlightedElements.forEach(element => {
            copiedText += element.innerText.trim() + '\n';  // Add each highlighted element's text
        });

        if (copiedText) {
            alert('Highlighted text sent for checking.');

            // Send the copied text to the background for storage
            chrome.runtime.sendMessage({ action: 'paste-text', content: copiedText.trim() });

            // Trigger opening the extension popup and scan
            chrome.runtime.sendMessage({ action: 'open-popup-and-scan' });

            clearHighlighting();  // Clear highlights
        }
    }
});

// Listen for the message to trigger the scan
chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === 'trigger-scan') {
        document.getElementById('scan-button').click();  // Click the Scan button
    }
});

// Function to clear all highlighted elements
function clearHighlighting() {
    highlightedElements.forEach(element => {
        element.style.outline = '';
    });
    highlightedElements.clear();
    isBacktickPressed = false;  // Ensure state is reset
}

// Function to determine if an element is text-based
function isTextElement(element) {
    const tagName = element.tagName.toLowerCase();
    return ['p', 'span', 'div', 'a'].includes(tagName);
}
