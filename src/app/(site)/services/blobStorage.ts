import type { ArticleItem, PaginatedResponse } from "@/utils/types";
import type { ArticleSummary } from "../types";

const PAGE_SIZE = 6;

function mapArticle(item: ArticleItem): ArticleSummary {
  return {
    id: item.id,
    slug: item.id,
    title: item.title,
    description: item.summary,
    heroImage: item.pdfUrl,
    publishedAt: item.createdAt,
    tags: item.tags,
  };
}

export async function getArticlesIndex(): Promise<ArticleSummary[]> {
  const response = await fetch(`/api/articles?page=1&pageSize=${PAGE_SIZE}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel obter os artigos");
  }

  const payload = (await response.json()) as PaginatedResponse<ArticleItem>;
  return payload.items.map(mapArticle);
}
