import React, { useMemo } from 'react';

const ManagerForm = ({ form, setForm, savePassword, toggleShowPassword, showPassword }) => {
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Password strength logic
  const passwordStrength = useMemo(() => {
    const pwd = form.password || '';
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0 to 4
  }, [form.password]);

  const strengthLabels = ['Too Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
  const strengthColors = ['#ff3e3e', '#ff8c42', '#ffca42', '#a4ff42', '#42ff42'];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        savePassword();
      }}
      className="flex flex-col gap-6"
    >
      <h2 className="text-3xl font-semibold text-coral mb-4">Add New Password</h2>

      <input
        type="text"
        name="site"
        value={form.site}
        onChange={handleChange}
        placeholder="Website URL"
        className="p-3 rounded-md bg-[#0a1f44] border border-coral focus:outline-none focus:ring-2 focus:ring-coral"
      />
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="p-3 rounded-md bg-[#0a1f44] border border-coral focus:outline-none focus:ring-2 focus:ring-coral"
      />
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-3 rounded-md w-full bg-[#0a1f44] border border-coral focus:outline-none focus:ring-2 focus:ring-coral"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-coral font-bold"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Password strength meter */}
      {form.password && (
        <div className="flex items-center gap-2">
          <div
            className="h-2 rounded flex-grow"
            style={{ backgroundColor: strengthColors[passwordStrength] }}
            aria-label={`Password strength: ${strengthLabels[passwordStrength]}`}
          />
          <span className="text-coral text-sm font-semibold select-none">
            {strengthLabels[passwordStrength]}
          </span>
        </div>
      )}

      <button
        type="submit"
        className="bg-coral hover:bg-[#ff4c4c] transition-colors rounded-md py-3 font-semibold"
      >
        Save Password
      </button>
    </form>
  );
};

export default ManagerForm;
