// SavedScreen.js
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../Context/ThemeContext";
import { auth, db } from "../Firebase/firebaseConfig";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import ArticleScreen from "./ArticleScreen";

const ListScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme.isDark;
  const user = auth.currentUser;

  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "savedArticles"),
      orderBy("savedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedArticles(articles);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const removeArticle = async (id) => {
    Alert.alert("Remove Article", "Remove from saved?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "users", user.uid, "savedArticles", id));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: isDark ? theme.card : "#fff" }]}
      onPress={() =>
        navigation.navigate("Article", {
          article: {
            title: item.title,
            description: item.description,
            image: item.image,
            url: item.url,
            publishedAt: item.publishedAt,
            source: { name: item.source },
            content: item.description,
          },
        })
      }
    >
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/300",
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.source}>
          {item.source} • {new Date(item.publishedAt).toDateString()}
        </Text>
      </View>

      <TouchableOpacity onPress={() => removeArticle(item.id)}>
        <Icon name="trash-outline" size={22} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  if (savedArticles.length === 0) {
    return (
      <View style={styles.center}>
        <Icon name="bookmark-outline" size={50} color="gray" />
        <Text style={{ color: theme.text, marginTop: 10 }}>
          No saved articles
        </Text>
      </View>
    );
  }

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Saved Articles
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={savedArticles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const Stack = createNativeStackNavigator();
export default function SavedScreen({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SavedList" component={ListScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
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

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
  },

  source: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
