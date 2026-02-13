import axios from "axios";

// ===============================
// BASE URL
// ===============================
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

    // Attach token if exists
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
    console.error("API Error:", error?.response || error);

    const status = error?.response?.status;
    const token = localStorage.getItem("token");

    // ===============================
    // NETWORK ERROR
    // ===============================
    if (!error.response) {
      console.error("Network error or server not reachable");
      return Promise.reject({
        message: "Server not reachable. Please try again.",
      });
    }

    // ===============================
    // TOKEN EXPIRED / UNAUTHORIZED
    // ===============================
    if (status === 401 && token) {
      localStorage.removeItem("token");

      // If using HashRouter:
      // window.location.replace("/#/");
      window.location.replace("/");

      return Promise.reject({
        message: "Session expired. Please login again.",
      });
    }

    // ===============================
    // RETURN CLEAN ERROR MESSAGE
    // ===============================
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong";

    return Promise.reject({
      status,
      message,
    });
  }
);

export default instance;