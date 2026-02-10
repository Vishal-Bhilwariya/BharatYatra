import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    // Admin token for admin routes
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken && config.url?.includes("/admin")) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    // User token for user profile route
    const userToken = localStorage.getItem("userToken");
    if (userToken && config.url?.includes("/user/profile")) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add global response interceptor to handle 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || "";
      if (url.includes("/admin")) {
        localStorage.removeItem("adminToken");
        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        }
      } else if (url.includes("/user")) {
        localStorage.removeItem("userToken");
      }
    }
    return Promise.reject(error);
  }
);

export default api;

