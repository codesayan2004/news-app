import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("APP_THEME");
        if (storedTheme !== null) {
          setIsDark(storedTheme === "dark");
        }
      } catch (e) {
        console.log("Theme load error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem("APP_THEME", newTheme ? "dark" : "light");
    } catch (e) {
      console.log("Theme save error:", e);
    }
  };

  const theme = {
    isDark,
    background: isDark ? "#121212" : "#ffffff",
    card: isDark ? "#1e1e1e" : "#fafafa",
    text: isDark ? "#ffffff" : "#000000",
    subText: isDark ? "#aaaaaa" : "gray",
  };

  if (loading) return null; // prevent flicker on app load

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
