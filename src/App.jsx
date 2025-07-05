import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ManagerForm from './components/ManagerForm';
import PasswordList from './components/PasswordList';
import usePasswordManager from './hooks/usePasswordManager';

function App() {
  const {
    form,
    setForm,
    passwordArray,
    savePassword,
    deletePassword,
    editPassword,
    copyText,
    toggleShowPassword,
    showPassword,
  } = usePasswordManager();

  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Safely filter passwords (check keys exist before .toLowerCase())
  const filteredPasswords = passwordArray.filter(({ site, username }) => {
    const s = site?.toLowerCase() || '';
    const u = username?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return s.includes(term) || u.includes(term);
  });

  return (
    <div className="flex flex-col min-h-screen font-poppins bg-[#0a1f44] text-white">
      <Navbar toggleDrawer={() => setShowForm(!showForm)} showForm={showForm} />

      <main className="flex-grow flex flex-col md:flex-row gap-6 px-6 py-8 max-w-7xl mx-auto">
        {/* Mobile toggle buttons */}
        <div className="flex md:hidden justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${showForm ? 'bg-coral' : 'bg-gray-700'}`}
            onClick={() => setShowForm(true)}
          >
            Form
          </button>
          <button
            className={`px-4 py-2 rounded ${!showForm ? 'bg-coral' : 'bg-gray-700'}`}
            onClick={() => setShowForm(false)}
          >
            Passwords
          </button>
        </div>

        {(showForm || window.innerWidth >= 768) && (
          <section className="md:w-1/3 w-full bg-[#112a61] rounded-lg p-6 shadow-lg">
            <ManagerForm
              form={form}
              setForm={setForm}
              savePassword={savePassword}
              toggleShowPassword={toggleShowPassword}
              showPassword={showPassword}
            />
          </section>
        )}

        {(!showForm || window.innerWidth >= 768) && (
          <section className="md:w-2/3 w-full bg-[#112a61] rounded-lg p-6 shadow-lg overflow-auto max-h-[calc(100vh-136px)] flex flex-col">
            <input
              type="search"
              placeholder="Search by site or username..."
              className="mb-4 p-3 rounded-md bg-[#0a1f44] border border-coral focus:outline-none focus:ring-2 focus:ring-coral text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <PasswordList
              passwordArray={filteredPasswords}
              copyText={copyText}
              deletePassword={deletePassword}
              editPassword={editPassword}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
