// Manually implement tokenization and padding
function textsToSequences(texts, tokenizerData) {
  const wordIndex = tokenizerData['config']['word_index'];
  return texts.map(text => {
    return text.split(/\s+/).map(word => wordIndex[word] || wordIndex['<OOV>'] || 0);
  });
}

function padSequences(sequences, maxLen) {
  return sequences.map(seq => {
    if (seq.length < maxLen) {
      // Pre-pad sequences with 0s
      return new Array(maxLen - seq.length).fill(0).concat(seq);
    } else {
      // Truncate sequences longer than maxLen
      return seq.slice(seq.length - maxLen);
    }
  });
}

async function loadResources() {
  // Fetch TensorFlow.js and tokenizer.json data
  const [tf, tokenizerData] = await Promise.all([
    import('@tensorflow/tfjs'),
    fetch(chrome.runtime.getURL('tokenizer.json')).then(res => res.json()),
  ]);
  return { tf, tokenizerData };
}

async function main() {
  const emailBodyElement = document.querySelector('.email-body-selector');  // Replace with correct selector
  if (!emailBodyElement) {
    console.error('Email content not found.');
    return;
  }

  const emailContent = emailBodyElement.innerText || emailBodyElement.textContent;

  // Load resources (TensorFlow.js and tokenizer data)
  const { tf, tokenizerData } = await loadResources();

  // Tokenize the email content
  const sequences = textsToSequences([emailContent], tokenizerData);
  const maxSequenceLength = 100; // Adjust as per your model's input length
  const paddedSequences = padSequences(sequences, maxSequenceLength);

  // Load the TensorFlow.js model
  const model = await tf.loadLayersModel(chrome.runtime.getURL('tfjs_model/model.json'));

  // Make predictions
  const prediction = model.predict(tf.tensor(paddedSequences));
  prediction.array().then(predArray => {
    const score = predArray[0][0];
    const result = score > 0.5 ? 'Phishing' : 'Legitimate';
    console.log('Prediction:', result, 'Confidence:', score * 100);
  });
}

main();