import { createContext, useContext, useEffect, useState } from "react";

// what the context will expose
interface AuthContextType {
  isLoggedIn: boolean;
  isAuthReady: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // when the component renders
  useEffect(() => {
    const loginStatusInStorage = localStorage.getItem("isLoggedIn");

    if (loginStatusInStorage && loginStatusInStorage === "true") {
      setIsLoggedIn(true);
    }

    // at this point, we checked the local storage
    // we need a way to tell the protected routes whether we checked for
    // authentication or not
    setIsAuthReady(true);
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
    <AuthContext.Provider value={{ isLoggedIn, isAuthReady, login, logout }}>
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
