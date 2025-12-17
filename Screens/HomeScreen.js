// HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { articlesData } from "../Data/articles";
import ArticleScreen from "./ArticleScreen";
import ProfileScreen from "./ProfileScreen";
import { ThemeContext } from "../Context/ThemeContext";
import { StatusBar } from "react-native";

const categories = ["Technology", "Sports", "Politics", "Health", "Science"];
const Stack = createNativeStackNavigator();

/* ---------------- HOME MAIN UI ---------------- */

function HomeMain({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { theme } = React.useContext(ThemeContext);
  const renderArticle = ({ item }) => {
    const publishedDate = new Date(item.publishedAt);
    const now = new Date();
    const diffTime = Math.abs(now - publishedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return (
      <TouchableOpacity
        style={[styles.articleCard, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate("Article", { article: item })}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
        <View style={styles.articleContent}>
          <Text style={[styles.title, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.details, { color: theme.subText }]}>
            {item.source.name} • {diffDays} day{diffDays !== 1 ? "s" : ""} ago
          </Text>
          <Text style={[styles.author, { color: theme.subText }]}>
            By {item.author}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const isDark = theme.isDark;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          NewsHub
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="person-circle-outline" size={30} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((cat, index) => {
          const isSelected = selectedCategory === cat;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isSelected ? "#007bff" : theme.card, 
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: isSelected ? "#fff" : theme.text, 
                  },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Article List */}
      <FlatList
        data={articlesData}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

/* ---------------- STACK EXPORT ---------------- */

export default function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeMain} />
      <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  categories: {
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 5,
  },
  categoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  categoryButtonSelected: { backgroundColor: "#007bff" },
  categoryText: { color: "#000" },
  categoryTextSelected: { color: "#fff" },
  articleCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  thumbnail: { width: 100, height: 100 },
  articleContent: { flex: 1, padding: 10, justifyContent: "space-between" },
  title: { fontWeight: "bold", fontSize: 16 },
  details: { color: "gray", fontSize: 12 },
  author: { fontSize: 12, fontStyle: "italic" },
});
