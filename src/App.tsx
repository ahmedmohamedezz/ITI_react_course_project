import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
import UserDetails from "./pages/UserDetails";

function App() {
  const { isLoggedIn } = useAuthContext();

  // store login credentails in localStorage when the app starts
  const CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  localStorage.setItem("CREDENTIALS", JSON.stringify(CREDENTIALS));

  return (
    <Routes>
      {/* route: maps path (url) --to--> element (component) */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      {/* any other route, should navigate to either login or dashboard */}
      {/* <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      /> */}
    </Routes>
  );
}

export default App;
