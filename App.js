import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./navigation/Mytabs";
import AuthStack from "./navigation/AuthStack";
import { ThemeProvider } from "./Context/ThemeContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; // or splash screen

  return (
    <ThemeProvider>
      <NavigationContainer>
        {user ? <MyTabs /> : <AuthStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
}