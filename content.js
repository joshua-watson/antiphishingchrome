let isBacktickPressed = false;
let highlightedElements = new Set();
let copiedText = '';  // Variable to store copied content
let uniqueTextSet = new Set();  // Set to track unique pieces of text

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

// Highlight elements when hovering while holding ` (backtick)
document.addEventListener('mouseover', function (event) {
    if (isBacktickPressed) {
        let target = event.target;
        if (target && isTextElement(target) && !highlightedElements.has(target)) {
            target.style.outline = '2px solid orange';  // Highlight element
            highlightedElements.add(target);  // Add element to Set to avoid duplication
        }
    }
});

// Copy highlighted content when ` + Click is pressed
document.addEventListener('click', function (event) {
    if (isBacktickPressed && highlightedElements.size > 0) {
        copiedText = '';  // Reset the variable
        uniqueTextSet.clear();  // Clear previous text for new click

        // Gather text from all highlighted elements
        highlightedElements.forEach(element => {
            let elementText = element.innerText.trim();

            // Check if text already exists in the set to avoid duplicates
            if (elementText && !uniqueTextSet.has(elementText)) {
                uniqueTextSet.add(elementText);  // Add to the set
                copiedText += elementText + '\n';  // Add the text of each highlighted element
            }
        });

        if (copiedText) {
            alert('Highlighted text sent for checking.');

            // Send the copied text (email content) to the background script
            chrome.runtime.sendMessage({
                action: 'paste-text', 
                content: copiedText.trim()  // Send only email content
            });

            // Trigger opening the extension popup and scan
            chrome.runtime.sendMessage({ action: 'open-popup-and-scan' });

            clearHighlighting();  // Clear highlights
        }
    }
});

// Function to clear all highlighted elements
function clearHighlighting() {
    highlightedElements.forEach(element => {
        element.style.outline = '';  // Remove outline
    });
    highlightedElements.clear();  // Clear the Set
    isBacktickPressed = false;  // Ensure state is reset
}

// Function to determine if an element is text-based
function isTextElement(element) {
    const tagName = element.tagName.toLowerCase();

    // Focus on key text-based elements like paragraphs, headers, and list items
    const allowedTags = ['p', 'a', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // Expanded excluded non-text elements
    const excludedTags = [
        'button', 'img', 'svg', 'input', 'textarea', 'select', 'form', 
        'nav', 'header', 'footer', 'aside', 'section', 'article', 'main', 
        'table', 'th', 'tr', 'td', 'iframe', 'object', 'embed', 'video', 
        'audio', 'canvas', 'div', 'span', 'noscript', 'meta', 'link', 
        'style', 'script', 'track', 'source', 'template', 'picture', 'map', 
        'area', 'menu', 'menuitem', 'details', 'dialog', 'summary', 'keygen', 
        'hr', 'br', 'abbr', 'code', 'pre', 'mark', 'bdi', 'bdo', 'cite', 
        'dfn', 'kbd', 'samp', 'var', 'wbr', 'figure', 'figcaption'
    ];

    // Ensure the tag is allowed and does not contain excluded parent elements
    if (!allowedTags.includes(tagName) || element.closest(excludedTags.join(', '))) {
        return false;
    }

    // Get the bounding box of the element to ensure it's visually distinct
    const rect = element.getBoundingClientRect();
    const elementIsVisible = (rect.width > 0 && rect.height > 0);  // Check if the element is visible

    return elementIsVisible;
}
