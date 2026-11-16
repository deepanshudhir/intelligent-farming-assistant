
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  const suggestions = [
    "Why are my tomato leaves turning yellow?",
    "How can I prevent potato blight?",
    "How do I improve soil fertility?",
    "What should I do during heavy rainfall?",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedImage(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async (text = message) => {
    const userMessage = text.trim();

    if ((!userMessage && !selectedImage) || loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to use the chatbot.");
      return;
    }

    const history = messages.map((item) => ({
      role: item.sender === "user" ? "user" : "assistant",
      content: item.text,
    }));

    const imageToSend = selectedImage;

    const displayMessage =
      userMessage || "Please analyze this crop image.";

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: displayMessage,
        image: preview || null,
      },
    ]);

    setMessage("");
    removeImage();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("message", userMessage);
      formData.append("history", JSON.stringify(history));

      if (imageToSend) {
        formData.append("image", imageToSend);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/chat`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "assistant",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to get AI response."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (loading) return;

    setMessages([]);
    setMessage("");
    removeImage();

    toast.success("Conversation cleared!");
  };

  return (
    <div className="chatbot-page">

      <div className="chatbot-header">
        <div className="chatbot-avatar">🌱</div>

        <div>
          <h1>AI Farming Assistant</h1>
          <p>Your smart agricultural companion</p>
        </div>

        <span className="chatbot-status">
          <span></span> AI Assistant Online
        </span>
      </div>

      <div className="chatbot-container">

        <div className="chatbot-messages">

          {messages.length === 0 ? (
            <div className="chatbot-welcome">

              <div className="welcome-bot-icon">🤖</div>

              <h2>Hello, Farmer! 👋</h2>

              <p>
                Ask questions about crop health, diseases,
                irrigation and farming practices.
                You can also upload a crop image.
              </p>

              <h3>Suggested Questions</h3>

              <div className="suggestion-list">
                {suggestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    disabled={loading}
                  >
                    {question} →
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="message-list">

              <div className="chat-actions">
                <button
                  onClick={clearChat}
                  disabled={loading}
                >
                  Clear Chat
                </button>
              </div>

              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`message-row ${item.sender}`}
                >
                  <div className="message-avatar">
                    {item.sender === "user" ? "👨‍🌾" : "🤖"}
                  </div>

                  <div className="message-bubble">

                    {item.image && (
                      <img
                        src={item.image}
                        alt="Uploaded crop"
                        className="chat-image"
                      />
                    )}

                    {item.text}

                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row assistant">
                  <div className="message-avatar">🤖</div>

                  <div className="message-bubble">
                    Analyzing your question...
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        <div className="chatbot-input-area">

          {preview && (
            <div className="image-preview-container">
              <img
                src={preview}
                alt="Selected crop"
                className="image-preview"
              />

              <button
                type="button"
                onClick={removeImage}
                disabled={loading}
              >
                ✕
              </button>
            </div>
          )}

          <form
            className="chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <button
              type="button"
              className="upload-image-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              📷
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

            <input
              type="text"
              placeholder="Ask something about farming..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={(!message.trim() && !selectedImage) || loading}
            >
              {loading ? "..." : "Send ➤"}
            </button>
          </form>

          <p>
            Upload a crop image or ask your farming question.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Chatbot;
