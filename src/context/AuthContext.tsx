import { createContext, useContext, useEffect, useState } from "react";

// what the context will expose
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("user");
  });

  // when the component renders
  useEffect(() => {
    const loginStatusInStorage = localStorage.getItem("isLoggedIn");

    if (loginStatusInStorage && loginStatusInStorage === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // persist login status in localStorage
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// for easy manipulation for the context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext provider is not available");
  }

  return context;
}
