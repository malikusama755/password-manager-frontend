import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://password-manager-backend-production-f60d.up.railway.app";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.length < 3 || form.email.length < 5 || form.password.length < 5) {
      toast.error("Please fill all fields properly", { theme: "dark" });
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      login(data.token); // save JWT to context + localStorage
      toast.success("Account created! Redirecting...", { theme: "dark" });
      navigate("/"); // Redirect to homepage

    } catch (err) {
      toast.error(err.message || "Signup failed", { theme: "dark" });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-amber-400">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded transition"
        >
          Create Account
        </button>
      </form>
    </motion.div>
  );
}
