// Search.js
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "../Context/ThemeContext";
import ArticleScreen from "./ArticleScreen";

const Stack = createNativeStackNavigator();

// 🔑 GNews API
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4";

/* ---------------- SEARCH MAIN UI ---------------- */

function SearchMain({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme.isDark;

  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 🔹 Load General News initially
  useEffect(() => {
    loadGeneralNews(true);
  }, []);

  /* ---------------- GENERAL NEWS ---------------- */

  const loadGeneralNews = async (reset = false) => {
    if (loading) return;

    try {
      setLoading(true);

      const currentPage = reset ? 1 : page;
      if (reset) setPage(1);

      const res = await fetch(
        `${BASE_URL}/top-headlines?topic=general&lang=en&max=10&page=${currentPage}&apikey=${API_KEY}`
      );

      const data = await res.json();

      setArticles(prev =>
        reset ? data.articles || [] : [...prev, ...(data.articles || [])]
      );

      setHasMore((data.articles || []).length === 10);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Error fetching general news:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SEARCH NEWS ---------------- */

  const searchNews = async (reset = false) => {
    if (!searchQuery.trim()) {
      loadGeneralNews(true);
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      Keyboard.dismiss();

      const currentPage = reset ? 1 : page;
      if (reset) setPage(1);

      const res = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(
          searchQuery
        )}&lang=en&max=10&page=${currentPage}&apikey=${API_KEY}`
      );

      const data = await res.json();

      setArticles(prev =>
        reset ? data.articles || [] : [...prev, ...(data.articles || [])]
      );

      setHasMore((data.articles || []).length === 10);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Error searching news:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER ITEM ---------------- */

  const renderArticle = ({ item }) => (
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
          {item.source?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /* ---------------- UI ---------------- */

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Search News
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
        placeholder="Search news..."
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        onSubmitEditing={() => searchNews(true)}
      />

      {/* Article List */}
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={() => {
          if (hasMore) {
            searchQuery.trim()
              ? searchNews()
              : loadGeneralNews();
          }
        }}
        onEndReachedThreshold={0.6}
        refreshing={loading}
        onRefresh={() => {
          searchQuery.trim()
            ? searchNews(true)
            : loadGeneralNews(true);
        }}
        ListEmptyComponent={
          !loading && (
            <View style={styles.noResults}>
              <Text style={{ color: theme.text }}>
                No results found
              </Text>
            </View>
          )
        }
      />
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
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  searchBar: {
    height: 40,
    marginHorizontal: 15,
    marginVertical: 10,
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

  thumbnail: {
    width: 100,
    height: 100,
  },

  articleContent: {
    flex: 1,
    padding: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  details: {
    fontSize: 12,
    marginTop: 4,
  },

  noResults: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
});
