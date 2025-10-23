import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  // we can use ReactNode instead of JSX.Element but
  // JSX.Element is more strict
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  console.log(children.type.name);
  return children;
}

export default ProtectedRoute;
