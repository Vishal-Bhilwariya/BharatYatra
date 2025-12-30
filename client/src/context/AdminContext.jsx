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
    // Check if admin token exists in localStorage
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdminToken(token);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdminToken(token);
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

