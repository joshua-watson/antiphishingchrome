# Phishing Email Detector Chrome Extension

This Chrome extension uses TensorFlow.js to detect phishing emails. It scans the content of emails and makes a prediction on whether the email is legitimate or a phishing attempt based on a pre-trained model.

## Prerequisites

To build and run this extension, ensure you have the following installed:

- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **Yarn**: Install by running `npm install --global yarn` (after installing Node.js)
- **Google Chrome**: The extension is built for the Chrome browser.

## Getting Started

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/joshua-watson/antiphishingchrome.git
```

### 2. Install Dependencies
Use Yarn to install all the required dependencies listed in the package.json file:


yarn install (This will install all necessary packages, including TensorFlow.js and Webpack.)

### 3. Build the Project

yarn build (This command uses Webpack to bundle the source files, copy static assets, and place everything in the dist/ folder, which will contain the final version of your Chrome extension.)

### 4. Load the Extension into Chrome
Open Google Chrome and navigate to chrome://extensions/.
Enable Developer mode (toggle switch in the top-right corner).

Click Load unpacked.

Select the dist/ folder generated after running the build.

The extension will now appear in your list of installed Chrome extensions.

## Project Structure
Here's an overview of the project files:

├── dist/                       # Bundled Chrome extension files
├── node_modules/               # Installed dependencies 
├── src/                        # Source code directory
│   ├── background.js           # Background script
│   ├── content.js              # Content script for analyzing email 
│   ├── popup.js                # JavaScript for the popup UI
│   ├── popup.html              # Popup UI when the extension icon is 
│   ├── options.js              # JavaScript for the options/settings 
│   ├── options.html            # Settings page for the extension
│   ├── styles.css              # Styles for the popup and options 
│   ├── tokenizer.json          # Tokenizer data used for text 
│   └── tfjs_model/             # TensorFlow.js model files (model and 
│       ├── model.json          # Model architecture for the neural 
│       └── group1-shard1of1.bin # Model weights
├── .babelrc                    # Babel configuration file
├── package.json                # Project metadata, dependencies, and 
├── webpack.config.js           # Webpack configuration for bundling 
└── README.md                   # Instructions on how to build and run

## How It Works:

### TensorFlow.js Model:

The model has already been trained a machine learning model and converted it to the TensorFlow.js format. This model, which consists of the model.json file and the .bin weight file, is stored locally within your Chrome extension (in the tfjs_model folder).
When the extension is loaded, it fetches these files and runs the model in the browser.

### Tokenization Process:

The tokenizer.json file is used to convert email text into sequences of numbers that can be fed into the model.

This tokenization is also done locally in the browser, based on the data in the tokenizer.json file. The content of the email (e.g., from Gmail) is tokenized and converted to a numerical format before being passed to the model for prediction.

### Content Script:

The content script (content.js) is the part of the extension that interacts with web pages. For example, it can scan an email in Gmail for phishing content.

The script will extract the email content, preprocess it (using the tokenizer), and then pass the processed content to the machine learning model for phishing detection.

### Background and Popup Scripts:

The background script (background.js) handles background tasks such as listening for messages from the content or popup scripts.

The popup script (popup.js) is the interface users see when they click the extension icon. It sends messages to the content or background scripts and displays the model’s prediction (whether the email is phishing or legitimate).