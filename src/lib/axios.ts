import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
