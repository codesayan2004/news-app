// ArticleScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../Context/ThemeContext";

export default function ArticleScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme.isDark;

  const { article } = route.params;
  const publishedDate = new Date(article.publishedAt).toDateString();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Article</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <Image source={{ uri: article.urlToImage }} style={styles.image} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>{article.title}</Text>

          <Text style={[styles.meta, { color: theme.subText }]}>
            {article.source.name} • {publishedDate}
          </Text>

          <Text style={[styles.author, { color: theme.subText }]}>
            By {article.author}
          </Text>

          <Text style={[styles.description, { color: theme.text }]}>
            {article.description}
          </Text>

          <Text style={[styles.body, { color: theme.text }]}>
            {article.content}
          </Text>

          {/* Read Full Article */}
          <TouchableOpacity
            style={styles.readMoreBtn}
            onPress={() => Linking.openURL(article.url)}
          >
            <Text style={styles.readMoreText}>Read Full Article</Text>
            <Icon name="open-outline" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 220,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  meta: {
    fontSize: 12,
    marginBottom: 4,
  },

  author: {
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    marginBottom: 10,
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
  },

  readMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
  },

  readMoreText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 6,
  },
});
