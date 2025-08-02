import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // import your auth hook

const BACKEND_URL = "https://password-manager-backend-production-f60d.up.railway.app";

export default function usePasswordManager() {
  const { token } = useAuth(); // get token from context

  const [form, setForm] = useState({ site: "", username: "", password: "", _id: null });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch all passwords from backend
  const getPasswords = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch passwords");
      const data = await res.json();
      setPasswordArray(data);
    } catch (error) {
      toast.error("Failed to load passwords from server", { theme: "dark" });
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) getPasswords();
  }, [token]);

  // Other functions (copyText, toggleShowPassword) unchanged

  // Save or update password
  const savePassword = async () => {
    if (
      form.site.trim().length > 3 &&
      form.username.trim().length > 3 &&
      form.password.trim().length > 3
    ) {
      try {
        let res;
        if (form._id) {
          await fetch(`${BACKEND_URL}/`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: form._id }),
          });
          res = await fetch(`${BACKEND_URL}/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              site: form.site,
              username: form.username,
              password: form.password,
            }),
          });
        } else {
          res = await fetch(`${BACKEND_URL}/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              site: form.site,
              username: form.username,
              password: form.password,
            }),
          });
        }

        if (!res.ok) throw new Error("Failed to save password");
        setForm({ site: "", username: "", password: "", _id: null });
        toast.success("Password saved!", { theme: "dark", autoClose: 2000 });
        getPasswords();
      } catch (error) {
        toast.error("Failed to save password", { theme: "dark" });
        console.error(error);
      }
    } else {
      toast.error("Please fill all fields with more than 3 characters!", { theme: "dark" });
    }
  };

  // Delete password
  const deletePassword = async (id) => {
    if (window.confirm("Do you really want to delete this password?")) {
      try {
        const res = await fetch(`${BACKEND_URL}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        });
        if (!res.ok) throw new Error("Failed to delete password");
        toast.info("Password deleted!", { theme: "dark", autoClose: 2000 });
        getPasswords();
      } catch (error) {
        toast.error("Failed to delete password", { theme: "dark" });
        console.error(error);
      }
    }
  };

  // Edit password unchanged

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
