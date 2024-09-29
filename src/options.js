document.getElementById('threshold').addEventListener('input', function () {
    const threshold = document.getElementById('threshold').value;
    document.getElementById('threshold-value').innerText = threshold;
  });
  
  document.getElementById('save-button').addEventListener('click', function () {
    const threshold = document.getElementById('threshold').value;
    chrome.storage.sync.set({ threshold: threshold }, function () {
      alert('Settings saved!');
    });
  });
  
  // Load the saved settings when the page loads
  document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['threshold'], function (data) {
      if (data.threshold) {
        document.getElementById('threshold').value = data.threshold;
        document.getElementById('threshold-value').innerText = data.threshold;
      }
    });
  });
  