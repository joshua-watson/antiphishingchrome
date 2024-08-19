import * as tf from '@tensorflow/tfjs';

document.getElementById('check-email').addEventListener('click', async () => {
  // Load the TensorFlow.js model
  const model = await tf.loadLayersModel(chrome.runtime.getURL('model/model.json'));

  // Prepare the input (you'll need to preprocess the email content similarly to how it was done in Python)
  const emailContent = "your email content here";
  const processedEmailContent = preprocessEmail(emailContent); // Define preprocessEmail function

  // Run inference
  const outputTensor = model.predict(processedEmailContent);
  const prediction = outputTensor.dataSync()[0];

  // Display the result
  const resultElement = document.getElementById('result');
  resultElement.textContent = prediction > 0.5 ? 'Phishing Email' : 'Safe Email';
});

function preprocessEmail(emailContent) {
  // Example preprocessing: tokenization, padding, etc.
  // For simplicity, let's assume it returns a tensor suitable for input to the model
  // Replace this with actual preprocessing logic similar to your Python preprocessing
  return tf.tensor([/* processed and tokenized email content as a tensor */]);
}
