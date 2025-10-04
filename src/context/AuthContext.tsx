/* eslint-disable react-refresh/only-export-components */
import type { User } from "@/types/user";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | User>(null);

  // Load token from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const accessToken = Cookies.get("accessToken");
    if (storedUser && accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken: string, user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("accessToken", accessToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
