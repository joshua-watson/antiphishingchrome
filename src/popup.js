document.getElementById('scan-button').addEventListener('click', function () {
    const emailContent = document.getElementById('email-content').value;
  
    chrome.runtime.sendMessage(
      { action: "scan-email", content: emailContent },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError);
          document.getElementById('error-message').style.display = 'block';
          return;
        }
  
        if (response && response.result) {
          const prediction = response.result.prediction;
          const confidence = response.result.confidence;
  
          document.getElementById('prediction-value').innerText = prediction;
          document.getElementById('likelihood-value').innerText = `${confidence.toFixed(2)}%`;
  
          document.getElementById('likelihood-value').style.color = prediction === 'Phishing' ? 'red' : 'green';
        }
      }
    );
  });
  