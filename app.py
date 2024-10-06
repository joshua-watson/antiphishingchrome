import logging
import time
from flask import Flask, request, jsonify
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set up logging to both file and console
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

# Create file handler for logging to a file
file_handler = logging.FileHandler('phishing_detection.log')
file_handler.setLevel(logging.INFO)
file_formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s')
file_handler.setFormatter(file_formatter)

# Add the file handler to the logger
app.logger.addHandler(file_handler)

# Load all models once based on the reshuffled complexity
models = {
    0: tf.keras.models.load_model('phishing_cnn_lstm_model_0.keras'),    # Worst performing
    25: tf.keras.models.load_model('phishing_cnn_lstm_model_25.keras'),  # 25% complexity
    50: tf.keras.models.load_model('phishing_cnn_lstm_model_50.keras'),  # 50% complexity
    75: tf.keras.models.load_model('phishing_cnn_lstm_model_75.keras'),  # 75% complexity
    100: tf.keras.models.load_model('phishing_cnn_lstm_model_100.keras') # Best performing
}

# Load the tokenizer
with open('tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define the max sequence length
max_sequence_length = 10000

@app.route('/predict', methods=['POST'])
def predict():
    try:
        start_time = time.time()

        # Receive the email content and threshold from the request
        data = request.json
        email_content = data['email_content']
        threshold = float(data.get('threshold', 0))  # Default to 0 if not provided

        # Log the threshold value
        app.logger.info(f"Threshold set to: {threshold}%")

        # Select the appropriate model based on threshold and log it
        if threshold == 0:
            selected_model = models[0]
            model_used = "phishing_cnn_lstm_model_0.keras"
        elif 0 < threshold <= 25:
            selected_model = models[25]
            model_used = "phishing_cnn_lstm_model_25.keras"
        elif 26 <= threshold <= 50:
            selected_model = models[50]
            model_used = "phishing_cnn_lstm_model_50.keras"
        elif 51 <= threshold <= 75:
            selected_model = models[75]
            model_used = "phishing_cnn_lstm_model_75.keras"
        elif 76 <= threshold <= 100:
            selected_model = models[100]
            model_used = "phishing_cnn_lstm_model_100.keras"

        # Log which model was used for processing
        app.logger.info(f"Model used for processing: {model_used}")

        # Preprocess the email content
        sequences = tokenizer.texts_to_sequences([email_content])
        padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)

        # Get prediction from the selected model
        prediction_prob = selected_model.predict(padded_sequences)

        # Your requested logic for likelihood and prediction label
        likelihood = prediction_prob[0][0] * 100  # Convert probability to percentage
        prediction_label = "Phishing" if prediction_prob[0][0] >= 0.5 else "Legitimate"

        # Log the prediction details
        app.logger.info(f"Prediction: {prediction_label}")
        app.logger.info(f"Likelihood: {likelihood:.2f}%")

        # Log the time taken to process the request
        end_time = time.time()
        app.logger.info(f"Request processing time: {end_time - start_time} seconds")

        return jsonify({
            'prediction': prediction_label,
            'likelihood': likelihood
        })

    except Exception as e:
        # Log the error details
        app.logger.error(f"Error during prediction: {str(e)}")
        return jsonify({
            'error': 'An error occurred during prediction.'
        }), 500

if __name__ == '__main__':
    app.run(host='192.168.0.241', port=5000, debug=True)
