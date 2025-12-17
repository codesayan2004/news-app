import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./navigation/Mytabs";
import { ThemeProvider } from "./Context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
