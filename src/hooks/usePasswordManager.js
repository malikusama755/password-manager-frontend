import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function usePasswordManager() {
  const [form, setForm] = useState({ site: '', username: '', password: '', _id: null });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch all passwords from backend
  const getPasswords = async () => {
    try {
      const res = await fetch('http://localhost:3000/');
      if (!res.ok) throw new Error('Failed to fetch passwords');
      const data = await res.json();
      setPasswordArray(data);
    } catch (error) {
      toast.error('Failed to load passwords from server', { theme: 'dark' });
      console.error(error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Copy text to clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { theme: 'dark', autoClose: 2000 });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Save or update password to backend
  const savePassword = async () => {
    if (
      form.site.trim().length > 3 &&
      form.username.trim().length > 3 &&
      form.password.trim().length > 3
    ) {
      try {
        let res;
        if (form._id) {
          // Update existing password (DELETE + POST approach or PUT if backend supports)
          // For now, delete old and insert new to keep simple
          await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: form._id }),
          });
          res = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ site: form.site, username: form.username, password: form.password }),
          });
        } else {
          // Add new password
          res = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ site: form.site, username: form.username, password: form.password }),
          });
        }

        if (!res.ok) throw new Error('Failed to save password');
        setForm({ site: '', username: '', password: '', _id: null });
        toast.success('Password saved!', { theme: 'dark', autoClose: 2000 });
        getPasswords();
      } catch (error) {
        toast.error('Failed to save password', { theme: 'dark' });
        console.error(error);
      }
    } else {
      toast.error('Please fill all fields with more than 3 characters!', { theme: 'dark' });
    }
  };

  // Delete password from backend
  const deletePassword = async (id) => {
    if (window.confirm('Do you really want to delete this password?')) {
      try {
        const res = await fetch('http://localhost:3000/', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: id }),
        });
        if (!res.ok) throw new Error('Failed to delete password');
        toast.info('Password deleted!', { theme: 'dark', autoClose: 2000 });
        getPasswords();
      } catch (error) {
        toast.error('Failed to delete password', { theme: 'dark' });
        console.error(error);
      }
    }
  };

  // Edit password: populate form with existing password data
  const editPassword = (id) => {
    const item = passwordArray.find((p) => p._id === id);
    if (item) {
      setForm({ site: item.site, username: item.username, password: item.password, _id: item._id });
    }
  };

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
