import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function usePasswordManager() {
  const { token, logout } = useAuth();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch passwords
  useEffect(() => {
    if (!token) return;
    fetch("https://password-manager-backend-production-f60d.up.railway.app/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) logout();
          throw new Error("Failed to fetch passwords");
        }
        return res.json();
      })
      .then(setPasswordArray)
      .catch(console.error);
  }, [token, logout]);

  // Save password
  const savePassword = async (data) => {
    const res = await fetch("https://password-manager-backend-production-f60d.up.railway.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save password");
    // Optionally refetch passwords here
  };

  // Delete password
  const deletePassword = async (_id) => {
    const res = await fetch("https://password-manager-backend-production-f60d.up.railway.app/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _id }),
    });
    if (!res.ok) throw new Error("Failed to delete password");
    // Optionally refetch passwords here
  };

  // Edit password (implement as needed)
  const editPassword = async (data) => {
    // Add your edit logic here, always include Authorization header
  };

  // Copy text utility
  const copyText = (text) => navigator.clipboard.writeText(text);

  const toggleShowPassword = () => setShowPassword((v) => !v);

  return {
    form,
    setForm,
    passwordArray,
    savePassword,
    deletePassword,
    editPassword,
    copyText,
    toggleShowPassword,
    showPassword,
  };
}

export default usePasswordManager;