
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pathlib import Path
import tensorflow as tf
import numpy as np
import io
import json

app = FastAPI(
    title="Intelligent Farming Assistant ML API",
    version="1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://intelligent-farming-assistant-eight.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resolve model paths relative to this file
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"

# Load model
model = tf.keras.models.load_model(
    str(MODEL_DIR / "plant_disease_model.keras")
)

# Load class names
with open(MODEL_DIR / "class_names.json", "r") as file:
    class_names = json.load(file)


@app.get("/")
def home():
    return {
        "message": "Intelligent Farming Assistant ML API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "loaded",
        "classes": len(class_names)
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Read image
    image_bytes = await file.read()

    # Convert image to RGB
    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    # Resize image
    image = image.resize((128, 128))

    # Convert to NumPy
    image_array = np.array(image)

    # Normalize
    image_array = image_array / 255.0

    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)

    # Prediction
    predictions = model.predict(image_array, verbose=0)

    # Get class index
    predicted_index = int(np.argmax(predictions[0]))

    # Get disease name
    predicted_class = class_names[predicted_index]

    # Get confidence
    confidence = float(np.max(predictions[0]) * 100)

    return {
        "disease": predicted_class,
        "confidence": round(confidence, 2),
        "class_index": predicted_index
    }
