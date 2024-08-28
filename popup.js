document.getElementById('detect-button').addEventListener('click', () => {
  const emailText = document.getElementById('email-content').value;
  const tokenizedText = emailText.split(/\s+/); // Basic tokenization

  chrome.runtime.sendMessage({
      action: 'detectPhishing',
      tokenizedText: tokenizedText
  }, (response) => {
      if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError.message);
          alert('Could not check the email for phishing due to an internal error.');
          return;
      }

      if (!response) {
          console.error('No response received.');
          alert('Could not check the email for phishing due to a network error.');
          return;
      }

      if (response.error) {
          console.error('Error:', response.error);
          alert('Could not check the email for phishing due to a server error.');
      } else if (response.result.is_phishing) {
          alert('Warning: This email may be a phishing attempt.');
      } else {
          alert('This email seems safe.');
      }
  });
});