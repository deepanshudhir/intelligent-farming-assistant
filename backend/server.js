const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/profileRoutes"));
app.use("/api/predictions", require("./routes/predictionRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Intelligent Farming Assistant Backend is running",
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});