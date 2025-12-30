// HomeScreen.js
import React, { useState, useEffect } from "react";
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
import { fetchNews } from "../services/newsApi";
import ArticleScreen from "./ArticleScreen";
import ProfileScreen from "./ProfileScreen";
import { ThemeContext } from "../Context/ThemeContext";
import { StatusBar } from "react-native";

const categories = [
  { label: "General", value: "general" },
  { label: "Technology", value: "technology" },
  { label: "Sports", value: "sports" },
  { label: "Business", value: "business" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
];

const Stack = createNativeStackNavigator();

/* ---------------- HOME MAIN UI ---------------- */

function HomeMain({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    loadNews(selectedCategory, true);
  }, [selectedCategory]);

  const loadNews = async (category, reset = false) => {
    if (loading) return;

    setLoading(true);

    const currentPage = reset ? 1 : page;
    const res = await fetchNews(category, currentPage);

    setArticles((prev) => (reset ? res.articles : [...prev, ...res.articles]));

    setPage(res.nextPage || currentPage);
    setLoading(false);
  };

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
        <Image
          source={{
            uri: item.image || "https://via.placeholder.com/100",
          }}
          style={styles.thumbnail}
        />
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
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        {/* Left: Logo + Title */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/verizo-logo.png")} // Replace with your logo path
            style={{ width: 35, height: 35, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Verizo
          </Text>
        </View>

        {/* Right: Profile Icon */}
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
          const isSelected = selectedCategory === cat.value;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cat.value)}
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
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Article List */}
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => page && loadNews(selectedCategory)}
        onEndReachedThreshold={0.6}
        refreshing={loading}
        onRefresh={() => loadNews(selectedCategory, true)}
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
