import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, isAuthReady } = useAuthContext();

  // Wait until we know the auth status
  if (!isAuthReady) return null; // or a loading spinner

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
