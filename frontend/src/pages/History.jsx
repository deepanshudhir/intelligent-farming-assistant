
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getPredictionHistory,
  deletePrediction,
} from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setHistory(data.history || []);
      } catch (err) {
        console.error("History error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load prediction history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Delete prediction
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prediction?"
    );

    if (!confirmed) return;

    try {
      await deletePrediction(id);

      setHistory((previousHistory) =>
        previousHistory.filter((item) => item._id !== id)
      );

      toast.success("Prediction deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to delete prediction."
      );
    }
  };

  if (loading) {
    return <h2>Loading prediction history...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="history-page">

      <div className="history-header">
        <h1>Prediction History</h1>
        <p>View your previous crop disease detections.</p>
      </div>

      {history.length === 0 ? (

        <div className="empty-history">
          <h2>No predictions yet 🌱</h2>
          <p>Your previous predictions will appear here.</p>
        </div>

      ) : (

        <div className="history-container">

          {history.map((item) => (

            <div
              className="history-card"
              key={item._id}
            >

              <h3>{item.crop}</h3>

              <p>
                <strong>Disease:</strong> {item.disease}
              </p>

              <p>
                <strong>Confidence:</strong> {item.confidence}%
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                🗑️ Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default History;
