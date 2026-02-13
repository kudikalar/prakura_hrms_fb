import axios from "axios";

// Use environment variable if available
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // attach token for protected APIs only
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);

    const status = error?.response?.status;
    const token = localStorage.getItem("token");

    // ✅ IMPORTANT FIX:
    // Only auto-logout/redirect when user ALREADY has a token (session expired case).
    // During login, there is no token, so DO NOT redirect (so error stays on page).
    if (status === 401 && token) {
      localStorage.removeItem("token");
      window.location.replace("/"); // safer than href (no extra history entry)
    }

    return Promise.reject(error);
  }
);

export default instance;