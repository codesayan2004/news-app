// ProfileScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../Context/ThemeContext";

export default function ProfileScreen( { navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? theme.card : "#fff" },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/400" }}
          style={styles.avatar}
        />

        <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>
          Sayan Mandal
        </Text>
        <Text style={styles.email}>sayan.mandal@iitg.ac.in</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#000" }]}>
              42
            </Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#000" }]}>
              12
            </Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>
      </View>

      {/* Dark Mode Toggle */}
      <View
        style={[
          styles.actionBtn,
          { backgroundColor: isDark ? "#1f1f1f" : "#f2f2f2" },
        ]}
      >
        <Icon
          name={isDark ? "moon" : "sunny"}
          size={20}
          color={isDark ? "#fff" : "#000"}
        />
        <Text
          style={[
            styles.actionText,
            { color: isDark ? "#fff" : "#000" },
          ]}
        >
          Dark Mode
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      {/* Actions */}
      <TouchableOpacity
        style={[
          styles.actionBtn,
          { backgroundColor: isDark ? "#1f1f1f" : "#f2f2f2" },
        ]}
      >
        <Icon name="bookmark-outline" size={20} color={isDark ? "#fff" : "#000"} />
        <Text style={[styles.actionText, { color: isDark ? "#fff" : "#000" }]}>
          Saved Articles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionBtn,
          { backgroundColor: isDark ? "#1f1f1f" : "#f2f2f2" },
        ]}
      >
        <Icon name="settings-outline" size={20} color={isDark ? "#fff" : "#000"} />
        <Text style={[styles.actionText, { color: isDark ? "#fff" : "#000" }]}>
          Settings
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: isDark ? "#1f1f1f" : "#f2f2f2" }]}>
        <Icon name="log-out-outline" size={20} color="red" />
        <Text style={[styles.actionText, { color: "red" }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    elevation: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  profileCard: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  email: {
    color: "gray",
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  statBox: {
    alignItems: "center",
    marginHorizontal: 20,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: "gray",
    fontSize: 12,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },

  actionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  logoutBtn: {
    marginTop: 10,
    backgroundColor: "#ffecec",
  },
});
