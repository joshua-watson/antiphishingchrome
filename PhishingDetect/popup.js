document.getElementById('email-content').addEventListener('input', function() {
    // Placeholder logic to update the likelihood value
    const inputLength = this.value.length;
    const likelihood = Math.min(inputLength, 100);
    document.getElementById('likelihood-value').innerText = likelihood + '%';
  });

  // Function for the pop up when icon is clicked from the chrome bar
  