import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token && /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)) {
      setAdminToken(token);
      setIsAuthenticated(true);
    } else if (token) {
      localStorage.removeItem("adminToken");
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    if (!token || typeof token !== "string") return;
    // Sanitize: keep only JWT-safe characters before validating
    const sanitized = token.replace(/[^A-Za-z0-9-_.]/g, "");
    if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(sanitized)) {
      return;
    }
    localStorage.setItem("adminToken", sanitized);
    setAdminToken(sanitized);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        adminToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

