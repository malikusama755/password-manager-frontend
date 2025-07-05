import React from 'react';

const PasswordList = ({ passwordArray, copyText, deletePassword, editPassword }) => {
  if (passwordArray.length === 0) {
    return <div className="text-center text-gray-400">No passwords saved yet.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-semibold text-coral mb-4">Your Passwords</h2>
      {passwordArray.map(({ _id, site, username, password }) => (
        <div
          key={_id}
          className="bg-[#0a1f44] p-4 rounded-md shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-lg">{site}</p>
            <p className="text-sm text-gray-300">Username: {username}</p>
            <p className="text-sm text-gray-300">Password: {'*'.repeat(password.length)}</p>
          </div>

          <div className="flex gap-4 text-coral text-xl">
            <button
              onClick={() => copyText(site)}
              title="Copy site"
              className="hover:text-[#ff6b6b]"
              aria-label={`Copy site ${site}`}
            >
              📋
            </button>
            <button
              onClick={() => copyText(username)}
              title="Copy username"
              className="hover:text-[#ff6b6b]"
              aria-label={`Copy username ${username}`}
            >
              👤
            </button>
            <button
              onClick={() => copyText(password)}
              title="Copy password"
              className="hover:text-[#ff6b6b]"
              aria-label={`Copy password`}
            >
              🔑
            </button>
            <button
              onClick={() => editPassword(_id)}
              title="Edit password"
              className="hover:text-[#ff6b6b]"
              aria-label={`Edit password for ${site}`}
            >
              ✏️
            </button>
            <button
              onClick={() => deletePassword(_id)}
              title="Delete password"
              className="hover:text-[#ff6b6b]"
              aria-label={`Delete password for ${site}`}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;
