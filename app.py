from flask import Flask, request, jsonify 
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

# Load the model
model = tf.keras.models.load_model('phishing_model.keras')

# Load the tokenizer
with open('tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define the max sequence length
max_sequence_length = 10000

@app.route('/predict', methods=['POST'])
def predict():
    email_content = request.json['email_content']
    sequences = tokenizer.texts_to_sequences([email_content])
    padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)

    # Get prediction from the model
    prediction = model.predict(padded_sequences)
    predicted_prob = prediction[0][0]

    # Assuming 1 = Safe and 0 = Phishing
    prediction_label = "Phishing" if predicted_prob <= 0.5 else "Safe"

    # Confidence is based on the probability output of the model
    confidence = predicted_prob * 100 if prediction_label == "Safe" else (1 - predicted_prob) * 100

    # Log the details for debugging
    print(f"Predicted Probability: {predicted_prob}")
    print(f"Prediction: {prediction_label}")
    print(f"Confidence: {confidence}%")

    return jsonify({
        'prediction': prediction_label,
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
