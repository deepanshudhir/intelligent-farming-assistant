# 🌱 Intelligent Farming Assistant (IFA)

An AI-powered farming assistance platform that helps farmers identify crop diseases, receive intelligent farming recommendations, and access useful agricultural information.

## 🚀 Live Demo

**Live Application:** https://intelligent-farming-assistant-eight.vercel.app

**Backend API:** https://intelligent-farming-assistant-v9pw.onrender.com

**Machine Learning API:** https://intelligent-farming-assistant-1.onrender.com

## 📌 About the Project

The Intelligent Farming Assistant is a full-stack web application that combines Artificial Intelligence, Machine Learning, and modern web technologies to support farmers in making better agricultural decisions.

The application allows users to upload crop leaf images and detect possible plant diseases using a trained deep learning model. It also provides AI-powered chatbot assistance, weather information, and prediction history.

## ✨ Features

- **AI-Based Crop Disease Detection:** Upload a leaf image and identify potential crop diseases.
- **Deep Learning Model:** TensorFlow/Keras model trained to classify 15 disease classes.
- **Disease Prediction Confidence:** Displays the predicted disease and confidence percentage.
- **AI Farming Chatbot:** Get farming-related assistance using Groq AI.
- **Weather Information:** Access weather information through the Open-Meteo API.
- **User Authentication:** Secure registration and login using JWT authentication.
- **Prediction History:** Store and access previous disease detection results.
- **User Dashboard:** Access farming tools and application features in one place.
- **Responsive Interface:** React-based frontend for a user-friendly experience.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Styling | CSS, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcrypt |
| Machine Learning | Python, TensorFlow, Keras |
| Image Processing | Pillow, NumPy |
| ML API | FastAPI, Uvicorn |
| AI Chatbot | Groq API |
| Weather | Open-Meteo API |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| ML Hosting | Render |
| Version Control | Git, GitHub |

## 🏗️ Project Architecture

```text
                  USER
                   |
                   v
          React + Vite Frontend
                (Vercel)
                   |
          ---------------------
          |                   |
          v                   v
     Node.js API          Python ML API
      (Render)              (Render)
          |                   |
          v                   v
     MongoDB Atlas       TensorFlow Model
          |
          v
    Prediction History

          |
          v
       Groq API
     AI Chatbot

          |
          v
    Open-Meteo API
     Weather Data
```

## 📂 Project Structure

```text
IFA/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── ml-api/
│   ├── model/
│   │   ├── plant_disease_model.keras
│   │   └── class_names.json
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/deepanshudhir/intelligent-farming-assistant.git

cd intelligent-farming-assistant
```

### 2. Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ML_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

### 3. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
npm start
```

### 4. Machine Learning API Setup

```bash
cd ml-api

python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
python -m uvicorn main:app --reload --port 8000
```

ML API documentation:

`http://127.0.0.1:8000/docs`

## 🔌 API Endpoints

### Backend API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/users/...` | User profile routes |
| `/api/predictions/...` | Prediction history routes |
| `/api/chat/...` | AI chatbot routes |

*See the backend route files for the exact methods and remaining endpoint paths.*

### Machine Learning API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/health` | Check model health |
| POST | `/predict` | Predict crop disease from an image |

Interactive API documentation:

`http://127.0.0.1:8000/docs`

## 🧠 Machine Learning Model

The application uses a trained TensorFlow/Keras deep learning model for crop disease classification.

**Model details:**

- Framework: TensorFlow / Keras
- Input image size: 128 × 128 pixels
- Input channels: 3 (RGB)
- Output classes: 15
- Output: Predicted disease class and confidence score

### Prediction Workflow

1. User uploads a crop leaf image.
2. FastAPI receives the image.
3. Image is converted to RGB.
4. Image is resized to 128 × 128.
5. Pixel values are normalized.
6. The trained model predicts the disease class.
7. The API returns the predicted disease and confidence percentage.

## ☁️ Deployment

The application is deployed using separate services:

| Component | Platform |
|---|---|
| React Frontend | Vercel |
| Express Backend | Render |
| FastAPI ML Service | Render |
| Database | MongoDB Atlas |

Environment variables must be configured separately in the respective hosting platforms.

## 🔐 Security

- JWT-based user authentication.
- Password hashing with bcrypt.
- Environment variables for API keys and database credentials.
- CORS configuration for authorized frontend origins.
- No API secrets should be committed to GitHub.

## 🔮 Future Enhancements

- More crop disease categories.
- Multilingual chatbot support.
- Weather-based crop recommendations.
- Nearby agricultural suppliers.
- Disease prevention and treatment recommendations.
- Mobile application support.
- Improved machine learning accuracy and model optimization.

## 👨‍💻 Author

**Deepanshu Dhir**

- GitHub: [@deepanshudhir](https://github.com/deepanshudhir)
- Project: [Intelligent Farming Assistant](https://github.com/deepanshudhir/intelligent-farming-assistant)

---

⭐ If you find this project useful, consider giving the repository a star!

**Built with ❤️ to make farming smarter through AI and technology.**
