import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, restore session from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("userToken");
        if (savedToken) {
            setToken(savedToken);
            // Fetch profile to validate token and get user data
            api
                .get("/user/profile", {
                    headers: { Authorization: `Bearer ${savedToken}` },
                })
                .then((res) => {
                    setUser(res.data.data);
                    setToken(savedToken);
                })
                .catch(() => {
                    // Token invalid/expired
                    localStorage.removeItem("userToken");
                    setToken(null);
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/user/login", { email, password });
        const { token: newToken, user: userData } = res.data.data;
        localStorage.setItem("userToken", newToken);
        setToken(newToken);
        setUser(userData);
        return res.data;
    };

    const signup = async (name, email, password) => {
        const res = await api.post("/user/signup", { name, email, password });
        const { token: newToken, user: userData } = res.data.data;
        localStorage.setItem("userToken", newToken);
        setToken(newToken);
        setUser(userData);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                loading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
