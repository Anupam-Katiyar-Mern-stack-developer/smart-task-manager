import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const response = error.response;
    const data = response?.data;

    let message;

    if (!response) {
      message = error.message || "Network error. Please check your connection.";
    } else if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data?.error === "string") {
      message = data.error;
    } else if (Array.isArray(data?.errors) && data.errors.length > 0) {
      message = data.errors
        .map((item) => (typeof item === "string" ? item : item.message))
        .filter(Boolean)
        .join(", ");
    } else {
      message = error.message || "Something went wrong. Please try again.";
    }

    toast.error(message);

    return Promise.reject(error);
  },
);

export default api;
