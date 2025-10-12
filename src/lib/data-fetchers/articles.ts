import { articles as mockArticles } from "@/app/(site)/mock/articles";
import type { ArticleSummary } from "@/app/(site)/types";

// A URL base da sua aplicação. Adapte se necessário.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getArticles(): Promise<ArticleSummary[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/articles`, {
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
