import axios from "axios";
import { cookies } from "next/headers";

/**
 * Server-side Axios instance
 * This instance is configured for server-side API calls with proper error handling
 * and authentication management
 */
const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for server-side authentication
serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const isAuthenticated = !!accessToken?.value;

  // Add authorization header if authenticated
  if (accessToken?.value) {
    config.headers.Authorization = `Bearer ${accessToken.value}`;
  }

  // Modify URL based on authentication status
  if (isAuthenticated && !config.url?.startsWith("/employee")) {
    config.url = `/employee${config.url}`;
  }

  // Add token_device for non-authenticated requests
  if (!isAuthenticated && config.method === "get") {
    config.params = {
      ...config.params,
      token_device: "STATIC_TOKEN",
    };
  }

  return config;
});

// Add response interceptor for error handling
serverApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export default serverApi;
