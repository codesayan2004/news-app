import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const API_KEY = process.env.EXPO_PUBLIC_AUTH_API;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "testing-app-e6528.firebaseapp.com",
  projectId: "testing-app-e6528",
  storageBucket: "testing-app-e6528.appspot.com",
  messagingSenderId: "78044106106",
  appId: "1:78044106106:web:2dc74cf639c60068a2dac3",
  measurementId: "G-E2E2MSB0PT",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);