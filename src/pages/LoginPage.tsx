import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface LoginCredentials {
  username: String;
  password: String;
}

function LoginPage() {
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);
  const [errMsg, setErrMsg] = useState<String | null>(null);
  const { isLoggedIn, login } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // can't login again
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  function handleFormSubmission(e: React.FormEvent) {
    e.preventDefault();

    let CREDENTIALS = localStorage.getItem("CREDENTIALS");
    if (!CREDENTIALS) {
      throw new Error("Login credentials is not found in localStorage");
    }

    const LoginCreds: LoginCredentials = JSON.parse(CREDENTIALS);

    if (username === LoginCreds.username && password === LoginCreds.password) {
      setErrMsg(null);
      login();
      navigate("/dashboard");
    } else {
      setErrMsg("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleFormSubmission}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        {errMsg && (
          <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">
            {errMsg}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
