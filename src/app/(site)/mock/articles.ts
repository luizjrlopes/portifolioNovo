// mock/articles.ts
import type { ArticleSummary } from "../types";

type ArticleMock = ArticleSummary & {
  description?: string;
  cover?: string;
  date?: string;
};

export const articles: ArticleMock[] = [
  /* ============== CLOUD ============== */
  {
    id: "mock-az-900",
    title: "AZ-900: Resumo Essencial",
    category: "Cloud",
    summary: "Mapa mental e notas de estudo para Azure Fundamentals.",
    description: "Mapa mental e notas de estudo para Azure Fundamentals.",
    pdfUrl: "/assets/articles/az-900-resumo.pdf",
    cover: "/assets/articles/covers/azure.jpg",
    createdAt: "2025-08-30T00:00:00.000Z",
    date: "2025-08-30",
    tags: ["Azure", "Certificação"],
  },

  /* ============== DEVOPS ============== */

  /* ============== PROGRAMAÇÃO ============== */

  /* ============== IA ============== */
];
