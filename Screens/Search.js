// Search.js
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { articlesData } from "../Data/articles";
import ArticleScreen from "./ArticleScreen";
import { ThemeContext } from "../Context/ThemeContext";

const Stack = createNativeStackNavigator();

/* ---------------- SEARCH MAIN UI ---------------- */

function SearchMain({ navigation }) {
  const { theme } = useContext(ThemeContext); // get current theme
  const isDark = theme.isDark;

  const articles = articlesData;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (text) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(text.toLowerCase()) ||
          article.author?.toLowerCase().includes(text.toLowerCase()) ||
          article.source.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.articleCard,
        { backgroundColor: isDark ? theme.card : "#fafafa" },
      ]}
      onPress={() => navigation.navigate("Article", { article: item })}
    >
      <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
      <View style={styles.articleContent}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.details, { color: theme.subText }]}>
          {item.source.name} • {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: isDark ? theme.card : "#f8f8f8" }]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Search Articles
        </Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: isDark ? "#1f1f1f" : "#fff",
            color: theme.text,
            borderColor: isDark ? "#333" : "#ccc",
          },
        ]}
        placeholder="Search articles..."
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Article List */}
      {filteredArticles.length > 0 ? (
        <FlatList
          data={filteredArticles}
          renderItem={renderArticle}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <View style={styles.noResults}>
          <Text style={{ color: theme.subText }}>No articles found</Text>
        </View>
      )}
    </View>
  );
}

/* ---------------- STACK EXPORT ---------------- */

export default function Search() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    elevation: 1,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  searchBar: {
    height: 40,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
  },

  articleCard: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  thumbnail: { width: 100, height: 100 },
  articleContent: { flex: 1, padding: 10, justifyContent: "space-between" },
  title: { fontWeight: "bold", fontSize: 16 },
  details: { fontSize: 12 },
  noResults: { flex: 1, justifyContent: "center", alignItems: "center" },
});
