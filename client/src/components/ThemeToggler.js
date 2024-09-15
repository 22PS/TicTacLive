import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div className="mb-4">
      <button
        onClick={() => toggleTheme('themeBlue')}
        className={`bg-blue-800 text-white px-4 py-2 rounded shadow-md ${
          theme === 'themeBlue' ? 'shadow-blue-400 shadow-lg' : ''
        }`}
      >
        Blue Theme
      </button>
      <button
        onClick={() => toggleTheme('themePink')}
        className={`bg-pink-700 text-white px-4 py-2 rounded mx-2 shadow-md ${
          theme === 'themePink' ? 'shadow-pink-400 shadow-lg' : ''
        }`}
      >
        Pink Theme
      </button>
      <button
        onClick={() => toggleTheme('themeBlackWhite')}
        className={`px-4 py-2 rounded shadow-md ${
          theme === 'themeBlackWhite'
            ? ' bg-white text-gray-950 shadow-gray-400 shadow-lg'
            : ' bg-black text-white'
        }`}
      >
        B & W Theme
      </button>
    </div>
  );
};

export default ThemeToggler;
