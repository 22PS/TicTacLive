import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('themeBlue');

  const toggleTheme = (newTheme) => {
    // let themeClass;
    // switch (newTheme) {
    //   case 'themeBlue':
    //     themeClass = 'bg-blue-100';
    //     break;
    //   case 'themePink':
    //     themeClass = 'bg-pink-100';
    //     break;
    //   case 'themeBlackWhite':
    //     themeClass = 'bg-black';
    //     break;
    //   default:
    //     themeClass = 'bg-blue-100';
    // }
    // setTheme(themeClass);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
