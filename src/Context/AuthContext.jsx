import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
