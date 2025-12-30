import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Image,
    Pressable,
    Platform,
    TouchableOpacity,
  } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

  
  export default function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
  
    const handleRegister = async () => {
      if (!validate()) return;
  
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        await updateProfile(userCredential.user, {
          displayName: username,
        });
      } catch (err) {
        alert(err.message);
      }
    };
  
    const validate = () => {
      let valid = true;
      let errors = {};
  
      if (username.length < 3) {
        errors.username = "Username must be at least 3 characters";
        valid = false;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
        valid = false;
      }
  
      if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
        valid = false;
      }
  
      setError(errors);
      return valid;
    };
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Logo */}
        <Image
          source={require("../assets/verizo-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>Verizo</Text>
        <Text style={styles.subtitle}>Create your account</Text>
  
        {/* Card */}
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#9CA3AF"
            value={username}
            onChangeText={setUsername}
          />
          {error.username && <Text style={styles.error}>{error.username}</Text>}
  
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {error.email && <Text style={styles.error}>{error.email}</Text>}
  
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error.password && <Text style={styles.error}>{error.password}</Text>}
  
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
  
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginBold}>Login</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0A0F1F",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginBottom: 10,
    },
    appName: {
      fontSize: 30,
      fontWeight: "700",
      color: "#FFFFFF",
    },
    subtitle: {
      fontSize: 14,
      color: "#A0A4B8",
      marginBottom: 25,
    },
    card: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      borderRadius: 20,
      padding: 20,
    },
    input: {
      backgroundColor: "#F3F4F6",
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "#2563EB",
      borderRadius: 12,
      paddingVertical: 14,
      marginTop: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    error: {
      color: "#EF4444",
      fontSize: 12,
      marginBottom: 6,
    },
    loginText: {
      color: "#9CA3AF",
      marginTop: 20,
    },
    loginBold: {
      color: "#60A5FA",
      fontWeight: "600",
    },
  });