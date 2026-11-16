
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import diseaseData from "../data/diseaseData";
import { savePrediction } from "../services/api";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const handlePredict = async () => {
    if (!image) {
      setError("Please select a crop leaf image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("file", image);

      // Step 1: Get prediction from FastAPI
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData
      );

      const prediction = response.data;

      console.log("API response:", prediction);

      // Step 2: Get disease information
      const diseaseKey = prediction.disease?.trim();
      const information = diseaseData[diseaseKey];

      console.log("Disease information:", information);

      // Step 3: Display prediction
      setResult({
        ...prediction,
        information: information || null,
      });

      // Step 4: Save prediction in MongoDB
      try {
        const saved = await savePrediction({
          crop: information?.crop || "Unknown",
          disease: prediction.disease,
          confidence: prediction.confidence,
        });

        console.log("Prediction saved:", saved);

        toast.success("Prediction saved to history!");
      } catch (saveError) {
        console.error(
          "Saving error:",
          saveError.response?.data || saveError.message
        );

        toast.error("Prediction generated, but saving failed.");
      }

    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        "Unable to analyze the image. Make sure the ML API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detection-page">

      {/* Header */}
      <div className="detection-header">
        <p>🌱 AI-Powered Detection</p>

        <h1>Crop Disease Detection</h1>

        <span>
          Upload a clear image of a crop leaf and our AI
          model will analyze it for possible diseases.
        </span>
      </div>

      <div className="detection-container">

        {/* Upload Section */}
        <div className="upload-card">

          <h2>Upload Leaf Image</h2>

          <p className="upload-description">
            Upload a clear image of the affected crop leaf.
          </p>

          <label className="upload-area">

            {preview ? (
              <img
                src={preview}
                alt="Selected crop"
                className="image-preview"
              />
            ) : (
              <>
                <div className="upload-icon">📷</div>

                <h3>Upload Crop Image</h3>

                <p>Click to browse</p>

                <small>JPG, JPEG or PNG</small>
              </>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
              hidden
            />

          </label>

          {image && (
            <p className="selected-file">
              Selected: {image.name}
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            className="predict-btn"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? "🔄 Analyzing..." : "🔍 Analyze Crop"}
          </button>

        </div>

        {/* Result Section */}
        <div className="result-card">

          <h2>Detection Result</h2>

          {result ? (

            <div className="prediction-result">

              <div className="result-icon">
                {result.information?.disease === "Healthy"
                  ? "✅"
                  : "⚠️"}
              </div>

              <p className="result-label">Detected Crop</p>

              <h3 className="crop-name">
                {result.information?.crop || "Unknown Crop"}
              </h3>

              <p className="result-label">Disease</p>

              <h3>
                {result.information?.disease || result.disease}
              </h3>

              {/* Confidence */}
              <div className="confidence">
                <span>Confidence</span>

                <strong>{result.confidence}%</strong>
              </div>

              <div className="confidence-bar">
                <div
                  className="confidence-progress"
                  style={{
                    width: `${result.confidence}%`,
                  }}
                />
              </div>

              {/* Disease Information */}
              {result.information ? (

                <div className="disease-info">

                  <div className="info-section">
                    <h4>🔍 Symptoms</h4>
                    <p>{result.information.symptoms}</p>
                  </div>

                  <div className="info-section">
                    <h4>💊 Recommended Action</h4>
                    <p>{result.information.treatment}</p>
                  </div>

                  <div className="info-section">
                    <h4>🌱 Prevention</h4>
                    <p>{result.information.prevention}</p>
                  </div>

                </div>

              ) : (

                <p className="information-warning">
                  Disease information is not available
                  for this prediction.
                </p>

              )}

            </div>

          ) : (

            <div className="empty-result">

              <div>🌿</div>

              <h3>No prediction yet</h3>

              <p>
                Upload a crop image and click
                <strong> Analyze Crop </strong>
                to see the result.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default DiseaseDetection;
