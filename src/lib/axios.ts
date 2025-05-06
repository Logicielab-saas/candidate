import axios from "axios";
import Cookies from "js-cookie";

/**
 * Axios instance configuration
 *
 * Creates and configures an axios instance that uses the Next.js API route
 * as a proxy to the actual API endpoint. This helps hide the real API URL
 * from the client.
 */
const api = axios.create({
  // Use relative URL to proxy through Next.js API route
  baseURL: "/api/",
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
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // Handle 401 errors (unauthorized)
//     if (error.response?.status === 401) {
//       Cookies.remove("accessToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
