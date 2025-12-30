import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to admin requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token && config.url?.includes("/admin")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
