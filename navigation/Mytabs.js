import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/SavedScreen';
import Search from '../Screens/Search';
import Ioncons from 'react-native-vector-icons/Ionicons';
import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    const { theme } = useContext(ThemeContext); // get current theme
  
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: theme.subText, // use theme color
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.background }, // dark/light bg
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ioncons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ioncons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ioncons name="bookmark" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  
