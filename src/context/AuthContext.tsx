import React, { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../api/axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar token guardado al abrir app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
      setAuthToken(savedToken);
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // LOGIN normal
  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    if (!res || !res.data) {
      console.warn("⚠ Backend no devolvió datos en login()");
      return null;
    }

    const { accessToken, user } = res.data;

    if (!user) {
      console.warn("⚠ Backend no devolvió user en login()");
      return null;
    }

    localStorage.setItem("token", accessToken);
    setAuthToken(accessToken);
    setTokenState(accessToken);

    setUser(user);

    return res.data; // 🔥 IMPORTANTE
  };

  // REGISTER normal
  const register = async (data: any) => {
    const res = await api.post("/auth/register", data);
    const { accessToken, user } = res.data;

    localStorage.setItem("token", accessToken);
    setAuthToken(accessToken);
    setTokenState(accessToken);

    setUser(user);

    return res.data; // 🔥 también lo devolvemos
  };

  // Obtener perfil real
  const getProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch {
      console.log("No se pudo cargar perfil");
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setTokenState(null);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
