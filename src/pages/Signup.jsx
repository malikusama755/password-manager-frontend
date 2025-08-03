import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://password-manager-backend-production-f60d.up.railway.app/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await response.json();
      if (data.success) {
        login(data.user, data.token); // Log in user after signup
        navigate("/");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a1f44] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#112a61] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && (
          <div className="mb-4 text-red-400 text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#0a1f44] border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-[#0a1f44] border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-[#0a1f44] border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
