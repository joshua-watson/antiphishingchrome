import * as tf from '@tensorflow/tfjs';

const TOPK_PREDICTIONS = 2;
const FIVE_SECONDS_IN_MS = 5000;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'contextMenu0',
    title: 'Classify text with Custom Model',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(clickMenuCallback);

class TextClassifier {
  constructor() {
    this.loadModel();
  }

  async loadModel() {
    console.log('Loading custom model...');
    const startTime = performance.now();
    try {
      this.model = await tf.loadLayersModel(chrome.runtime.getURL('model/model.json'));
      const totalTime = Math.floor(performance.now() - startTime);
      console.log(`Custom model loaded and initialized in ${totalTime} ms...`);
    } catch (e) {
      console.error('Unable to load custom model', e);
    }
  }

  async analyzeText(processedText, tabId) {
    if (!tabId) {
      console.error('No tab. No prediction.');
      return;
    }
    if (!this.model) {
      console.log('Waiting for model to load...');
      setTimeout(() => {
        this.analyzeText(processedText, tabId);
      }, FIVE_SECONDS_IN_MS);
      return;
    }
    console.log('Predicting...');
    const startTime = performance.now();

    const inputTensor = this.preprocessText(processedText);
    const predictions = this.model.predict(inputTensor);
    
    const topPredictions = Array.from(predictions.dataSync())
      .map((prob, index) => ({ label: index, probability: prob }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, TOPK_PREDICTIONS);

    const totalTime = performance.now() - startTime;
    console.log(`Done in ${totalTime.toFixed(1)} ms `);

    const message = { action: 'TEXT_CLICK_PROCESSED', processedText, topPredictions };
    chrome.tabs.sendMessage(tabId, message);
  }

  preprocessText(text) {
    const tokens = text.split(' ').map(word => word.length);
    const tensor = tf.tensor2d([tokens], [1, tokens.length]);
    return tensor;
  }
}

const textClassifier = new TextClassifier();

function clickMenuCallback(info, tab) {
  const message = { action: 'TEXT_CLICKED', selectedText: info.selectionText };
  chrome.tabs.sendMessage(tab.id, message, (resp) => {
    if (!resp.processedText) {
      console.error('Failed to process text.');
      return;
    }
    textClassifier.analyzeText(resp.processedText, tab.id);
  });
}