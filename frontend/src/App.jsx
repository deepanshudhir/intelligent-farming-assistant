
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import Weather from "./pages/Weather";
import Chatbot from "./pages/Chatbot";
import History from "./pages/History";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      <Routes>
        {/* Public Home */}
        <Route path="/" element={<Home />} />

        {/* Login and Register */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/disease-detection"
            element={<DiseaseDetection />}
          />
          <Route path="/weather" element={<Weather />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
