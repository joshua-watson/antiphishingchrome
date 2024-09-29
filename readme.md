# Phishing Email Detector Chrome Extension

This Chrome extension detects phishing emails by scanning the content and sending it to a machine learning model for analysis. The tool provides predictions on whether the email is legitimate or a phishing attempt, based on a pre-trained model.

## Prerequisites

Ensure you have the following installed before proceeding:

- **Python 3.x**: Download from [python.org](https://www.python.org/).
- **Visual Studio Code (VSCode)**: Recommended for running and editing the project. Download from [code.visualstudio.com](https://code.visualstudio.com/).
- **Google Chrome**: The extension is built for the Chrome browser.

### Python Libraries for `app.py`

Install the necessary Python, Flask libraries before running the API using command line or Terminal in VSCode:
```bash
pip install Flask
pip install tensorflow
pip install Flask-Cors
```
## Getting Started and Setup

Follow these steps to get started with the Phishing Email Detector:

### 1. Download the Repository to Your Local Device
Download the repository containing the Chrome extension files to your local machine. Shown below is the folder structure of the **PhishingDetect** folder you will need to set up:
```bash
├── images/                     # Folder containing icon assets for the extension
│   ├── Email_Contents           # Icon representing email content
│   ├── Logo                     # Logo icon for the extension
│   ├── Refresh                  # Refresh icon used in the extension
│   └── settings-icon            # Settings gear icon for the extension
├── readme                      # Markdown source file (README.md)
├── app.py                      # Python file for running the API
├── background.js               # Background JavaScript file for the extension
├── content.js                  # Content script to interact with web pages
├── manifest.json               # Manifest file for the Chrome extension
├── options.html                # HTML file for the options/settings page
├── options.js                  # JavaScript file for the options/settings page
├── package.json                # JSON file containing project metadata and dependencies
├── popup.html                  # HTML file for the popup interface
├── popup.js                    # JavaScript file for the popup UI
├── style.css                   # CSS styles for the popup and options pages
├── tokenizer.pkl               # Pickle file containing the tokenizer data

```
## 2. Organize the Files
Place the entire downloaded repository into a folder called **PhishingDetect**. This ensures you don't need to modify the `manifest.json` or other file paths.

## 3. Load the Extension into Google Chrome
- Open Google Chrome and navigate to `chrome://extensions/`.
- Enable **Developer mode** by toggling the switch in the top-right corner.
- Click **Load unpacked**.
- Select the **PhishingDetect** folder.

The extension will now be loaded and available in Chrome.

## 4. Download the Keras Model from the Google Drive 
The pre-trained model for phishing detection is too large for GitHub. Download it from this [Google Drive link](https://drive.google.com/file/d/1QyyWVt1OaII-V5KaN7RX2UDwZFFw2ucs/view?usp=drive_link) and place the model files (`phishing_model.keras` file) in the **PhishingDetect** folder. (This model is not the updated one but still performs decently) 

This ensures the model is available for the extension to use during phishing detection.

## 5. Update and Run the API
1. Update the app.py host IP address to yours.
2. Go into Command line and use code 
```bash
ipconfig
```
3. Then update this line of code in app.py
```bash
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```
4. Also update the background.js file with your host address
```bash
if (request.action === 'scan-email') {
        fetch('http://0.0.0.0:5000/predict', {  // Replace with your correct IP if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_content: request.content })
        })
```
####Then: Run the API 
1. Open a terminal or use VSCode's integrated terminal.
2. Navigate to the **PhishingDetect** folder.
```bash
cd /path/to/phishingdetect
```
3. Run the following command to start the API:
```bash
python app.py
```

If using command line there a few things you need to do:
1. Change directory to **PhishingDetect** Folder using cd 
2. Run the following command to start the API: (if you don't have python install it won't work)

```bash
python app.py
```

# Phishing Detection Tool User Guide

## Overview:
The **Phishing Detection Tool** is designed to help you detect whether email content is phishing or safe. It works by integrating with a Flask API that processes the email content and returns a confidence percentage along with a prediction.

## Steps for Usage:

### 1. Open the Web Page Containing the Email Content:
Navigate to the page where the email content you wish to scan is located.

### 2. Highlight Email Contents Using the Backtick Key (`):
- **Press and Hold** the **` (backtick)** key on your keyboard.
- **Hover your mouse** over the email content you want to scan. 
- The content will be highlighted with an orange border.
- **Left-Click** on the highlighted content. A prompt will appear notifying you that the content has been copied to the Phishing Detection Tool.

### 3. Confirm the Copy Action:
- A pop-up will confirm the email content has been successfully copied.
- **Click "OK"** on the pop-up to proceed.

### 4. Open the Phishing Detection Tool Extension:
- After confirming the copy action, the Phishing Detection Tool extension will automatically open.

### 5. Paste Email Content:
- The copied email content should automatically appear in the **Email Contents** box within the extension.

### 6. Scan the Email Content:
- Press the **"Scan Email Contents"** button to send the email content for scanning.

### 7. Wait for the Results:
- The tool will send the email content to the Flask API, which processes the text and returns a **Confidence Percentage** and a **Prediction**.

### 8. View the Results:
- The **Confidence Percentage** will indicate how sure the tool is about its classification.
- The **Prediction** will either show **"Phishing"** (in red) or **"Safe"** (in green) based on the email content.

---

## Additional Features:

- **Refresh**: Click the refresh icon in the top-right corner of the extension to reload the tool.
- **Settings**: Click the gear icon to access the settings, where you can adjust preferences like the Phishing Detection Threshold.
- **Threshold(NOT WORKING)**: Slider is for setting the threshold of the model performance
- **Dark Mode(NOT WORKING)**: This switch will switch the appearance of the application from light or dark mode.

The **Phishing Detection Tool** offers a streamlined way to check for phishing threats within email content while browsing the web. Just follow these simple steps to safeguard your inbox.

