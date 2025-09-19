// mock/articles.ts
import type { ArticleSummary } from "../types";

export const articles: ArticleSummary[] = [
  /* ============== CLOUD ============== */
  {
    title: "AZ-900: Resumo Essencial",
    category: "Cloud",
    date: "2025-08-30",
    description: "Mapa mental e notas de estudo para Azure Fundamentals.",
    pdfUrl: "/assets/articles/az-900-resumo.pdf",
    cover: "/assets/articles/covers/azure.jpg",
  },
  {
    title: "Arquiteturas em Nuvem: Referências Práticas",
    category: "Cloud",
    date: "2025-07-18",
    description: "Padrões de referência para workloads web e dados no Azure.",
    pdfUrl: "/assets/articles/arquiteturas-nuvem.pdf",
    cover: "/assets/articles/covers/cloud-refs.jpg",
  },
  {
    title: "Stack Tecnológica – Projeto Aurora (v1.0)",
    category: "Cloud",
    date: "2025-09-07",
    description: "Decisões de stack e trade-offs do robô Orion/Aurora.",
    pdfUrl: "/assets/articles/stack-aurora.pdf",
    cover: "/assets/articles/covers/aurora-stack.jpg",
  },

  /* ============== DEVOPS ============== */
  {
    title: "CI/CD com GitHub Actions para Monorepo",
    category: "DevOps",
    date: "2025-08-12",
    description: "Pipelines, caches, matrizes e ambientes.",
    pdfUrl: "/assets/articles/gh-actions-monorepo.pdf",
    cover: "/assets/articles/covers/github-actions.jpg",
  },
  {
    title: "Observabilidade 101: Logs, Métricas e Traces",
    category: "DevOps",
    date: "2025-06-28",
    description: "Guia prático com OpenTelemetry e dashboards.",
    pdfUrl: "/assets/articles/observabilidade-101.pdf",
    cover: "/assets/articles/covers/observability.jpg",
  },
  {
    title: "Infra como Código: Bicep & Terraform",
    category: "DevOps",
    date: "2025-05-21",
    description: "Práticas de módulos, estados e políticas.",
    pdfUrl: "/assets/articles/iac-bicep-terraform.pdf",
    cover: "/assets/articles/covers/iac.jpg",
  },

  /* ============== PROGRAMAÇÃO ============== */
  {
    title: "Fundamentos de Python – Guia Rápido",
    category: "Programação",
    date: "2025-08-20",
    description: "Sintaxe, coleções, funções e módulos em 20 páginas.",
    pdfUrl: "/assets/articles/python-fundamentals.pdf",
    cover: "/assets/articles/covers/python.jpg",
  },
  {
    title: "Next.js + Styled-Components: Setup Prod",
    category: "Programação",
    date: "2025-07-05",
    description: "SSR/SSG, theming, tipagem e acessibilidade.",
    pdfUrl: "/assets/articles/next-styled-setup.pdf",
    cover: "/assets/articles/covers/nextjs.jpg",
  },
  {
    title: "Padrões de Design para Front-Ends Modernos",
    category: "Programação",
    date: "2025-06-15",
    description: "Arquitetura de componentes, estado e performance.",
    pdfUrl: "/assets/articles/padroes-frontend.pdf",
    cover: "/assets/articles/covers/frontend-patterns.jpg",
  },

  /* ============== IA ============== */
  {
    title: "RAG com Azure AI Search: do Zero ao Prod",
    category: "IA",
    date: "2025-08-27",
    description: "Ingestão, chunking, re-ranking e avaliação.",
    pdfUrl: "/assets/articles/rag-azure.pdf",
    cover: "/assets/articles/covers/rag.jpg",
  },
  {
    title: "Engenharia de Prompt: Estruturas e PICOC",
    category: "IA",
    date: "2025-09-16",
    description: "Modelos de prompt, PICOC e avaliação objetiva.",
    pdfUrl: "/assets/articles/engenharia-prompt-picoc.pdf",
    cover: "/assets/articles/covers/prompt.jpg",
  },
  {
    title: "Orion/Aurora v2.0 – Whitepaper",
    category: "IA",
    date: "2025-09-10",
    description: "Arquitetura quantamental e aprendizado de fontes.",
    pdfUrl: "/assets/articles/orion-aurora-whitepaper.pdf",
    cover: "/assets/articles/covers/aurora.jpg",
  },
];
