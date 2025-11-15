// mock/articles.ts
import type { ArticleSummary } from "../types";
import Azure_Fundamentals from "/public/assets/articles/covers/azure.jpg";

type ArticleMock = ArticleSummary & {
  description?: string;
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
    url: "https://www.linkedin.com/pulse/computa%25C3%25A7%25C3%25A3o-em-nuvem-luiz-j%25C3%25BAnior-lopes/?trackingId=EkwpthByQVSg7UKp4%2B%2Bz2g%3D%3D",
    cover: Azure_Fundamentals,
    createdAt: "2025-08-30T00:00:00.000Z",
    date: "2025-08-30",
    tags: ["Azure", "Certificação"],
  },

  /* ============== DEVOPS ============== */

  /* ============== PROGRAMAÇÃO ============== */

  /* ============== IA ============== */
];
