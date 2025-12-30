const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4/top-headlines";

export const fetchNews = async (category = "general", page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&topic=${category}&lang=en&country=in&max=10&page=${page}`
    );

    const data = await response.json();

    return {
      articles: (data.articles || []).map(item => ({
        title: item.title,
        description: item.description,
        url: item.url,
        image: item.image,
        publishedAt: item.publishedAt,
        content: item.content,
        author: item.source?.name || "Unknown",
        source: { name: item.source?.name || "GNews" },
      })),
      nextPage: data.totalArticles > page * 10 ? page + 1 : null,
    };
  } catch (error) {
    console.error("GNews API Error:", error);
    return { articles: [], nextPage: null };
  }
};
