//ThemeContext.js
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = {
    isDark,
    background: isDark ? "#121212" : "#ffffff",
    card: isDark ? "#1e1e1e" : "#fafafa",
    text: isDark ? "#ffffff" : "#000000",
    subText: isDark ? "#aaaaaa" : "gray",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
