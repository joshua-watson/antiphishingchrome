// Handle the threshold input change and display the value
document.getElementById('threshold').addEventListener('input', function () { 
  const threshold = document.getElementById('threshold').value;
  document.getElementById('threshold-value').innerText = threshold;
});

// Handle the Save button click to store the threshold in Chrome storage
document.getElementById('save-button').addEventListener('click', function () {
  const threshold = document.getElementById('threshold').value;
  chrome.storage.sync.set({ threshold: threshold }, function () {
    alert('Settings saved!');
  });
});

// Load the saved threshold value when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(['threshold'], function (data) {
    if (data.threshold) {
      document.getElementById('threshold').value = data.threshold;
      document.getElementById('threshold-value').innerText = data.threshold;
    }
  });
});

// Go Back button functionality to return to the popup.html
document.getElementById('go-back').addEventListener('click', function () {
  window.location.href = "popup.html";  // Navigate back to the popup page
});
