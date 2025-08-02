import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function usePasswordManager() {
  const { token, logout } = useAuth();
  const [form, setForm] = useState({ site: "", username: "", password: "", _id: null });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch passwords
  const fetchPasswords = () => {
    if (!token) return;
    fetch("https://password-manager-backend-production-f60d.up.railway.app/passwords", {
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
  };

  useEffect(() => {
    fetchPasswords();
  }, [token]);

  // Save password (create or update)
  const savePassword = async (data) => {
    try {
      // If _id exists, delete old and add new (no update route in backend)
      if (data._id) {
        await fetch("https://password-manager-backend-production-f60d.up.railway.app/passwords", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ _id: data._id.toString() }),
        });
      }

      const res = await fetch("https://password-manager-backend-production-f60d.up.railway.app/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          site: data.site,
          username: data.username,
          password: data.password,
        }),
      });

      if (!res.ok) throw new Error("Failed to save password");

      setForm({ site: "", username: "", password: "", _id: null });
      fetchPasswords();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete password
  const deletePassword = async (_id) => {
    try {
      const res = await fetch("https://password-manager-backend-production-f60d.up.railway.app/passwords", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: _id.toString() }),
      });

      if (!res.ok) throw new Error("Failed to delete password");
      fetchPasswords();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit password: populate form with existing password data
  const editPassword = (id) => {
    const item = passwordArray.find((p) => 
      p._id === id || (p._id.toString && p._id.toString() === id)
    );
    if (item) {
      setForm({
        site: item.site,
        username: item.username,
        password: item.password,
        _id: item._id.toString ? item._id.toString() : item._id,
      });
    }
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
