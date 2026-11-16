
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await API.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const savePrediction = async (predictionData) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/predictions/save",
    predictionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getPredictionHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/predictions/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deletePrediction = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/predictions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default API;
