import { articles as mockArticles } from "@/app/(site)/mock/articles";
import type { ArticleSummary } from "@/app/(site)/types";
import { fetchData } from "./index";

export async function getArticles(): Promise<ArticleSummary[]> {
  return fetchData({
    endpoint: "articles",
    mockData: mockArticles,
    devDelay: 300,
  });
}
