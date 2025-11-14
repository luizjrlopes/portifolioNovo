import { articles as mockArticles } from "@/app/(site)/mock/articles";
import type { ArticleSummary } from "@/app/(site)/types";

// Detecta a porta atual durante o runtime
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

export async function getArticles(): Promise<ArticleSummary[]> {
  // Retorna dados mock imediatamente para desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockArticles), 300);
    });
  }
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles from API");
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      console.warn("API returned no articles, using mock data as fallback.");
      return mockArticles;
    }

    return data.items;
  } catch (error) {
    console.error(
      "Error fetching articles from API, falling back to mock data:",
      error
    );
    return mockArticles;
  }
}
