import React from 'react';

const Navbar = ({ toggleDrawer, showForm }) => {
  return (
    <nav className="bg-[#071527] shadow-md py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-coral select-none cursor-default">
          PassGuard <span className="text-white text-lg font-light">by Malik</span>
        </h1>

        {/* Mobile drawer toggle button */}
        <button
          onClick={toggleDrawer}
          className="md:hidden flex items-center gap-2 text-coral hover:text-[#ff4c4c] transition focus:outline-none"
          aria-label="Toggle drawer"
        >
          <SkullIcon className="w-7 h-7" />
          <span className="font-semibold">{showForm ? 'Show Passwords' : 'Show Form'}</span>
        </button>

        {/* Desktop GitHub link */}
        <a
          href="https://github.com/malik"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-white hover:text-coral transition"
          aria-label="GitHub"
        >
          <SkullIcon className="w-7 h-7" />
          <span className="font-semibold">GitHub</span>
        </a>
      </div>
    </nav>
  );
};

// Skull SVG icon component
const SkullIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2c-4.418 0-8 3.582-8 8 0 3.86 2.686 7.056 6.304 7.87V21h3.392v-3.13C17.313 17.002 20 13.81 20 10c0-4.418-3.582-8-8-8zM9 9h.01M15 9h.01M12 14c.667 0 1.334-.667 1.334-1.334 0-.738-.667-1.333-1.334-1.333-.738 0-1.334.595-1.334 1.333 0 .667.596 1.334 1.334 1.334z"
    ></path>
  </svg>
);

export default Navbar;
