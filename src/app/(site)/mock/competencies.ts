import type { Competency } from "../types";

export const competencies: Competency[] = [
  // IA & LLMs
  {
    category: "IA & LLMs",
    subCategory: "Engenharia de Agentes",
    title: "LLM Engineering",
    items: [
      "Function calling e tool use com OpenAI API e Anthropic API",
      "Prompt engineering determinístico para uso corporativo",
      "Pipelines RAG (Retrieval-Augmented Generation)",
      "Orquestração de agentes com LangGraph e CrewAI",
      "Embeddings, vector search e re-ranking",
    ],
    chips: ["OpenAI API", "Claude API", "LangGraph", "CrewAI", "RAG", "Function Calling"],
  },
  {
    category: "IA & LLMs",
    subCategory: "Automação",
    title: "Pipelines e Automação com IA",
    items: [
      "Agentes rule-based com arquitetura equivalente a agentes LLM",
      "Automação de fluxos analíticos end-to-end sem intervenção humana",
      "Integração de LLMs em aplicações web e APIs REST",
      "Observabilidade de sistemas com IA (Langfuse, RAGAS)",
      "Separação de lógica de produção e experimentos (ml/llm)",
    ],
    chips: ["Python", "FastAPI", "n8n", "Langfuse", "Azure AI Services"],
  },
  // Cloud
  {
    category: "Cloud",
    subCategory: "Microsoft Azure",
    title: "Azure Developer & AI (AZ-204 / AI-102)",
    items: [
      "Azure App Service, Functions e Container Apps",
      "Azure AI Services: OpenAI, Speech, Vision, Language",
      "Azure Cosmos DB, Blob Storage e Service Bus",
      "Azure DevOps: pipelines CI/CD, repos e boards",
      "Identidade e governança com Entra ID (Azure AD)",
    ],
    chips: ["AZ-204", "AI-102", "Azure OpenAI", "AKS", "Bicep", "Terraform"],
  },
  {
    category: "Cloud",
    subCategory: "DevOps",
    title: "DevOps & IaC",
    items: [
      "GitHub Actions: pipelines CI/CD com lint, test e security jobs",
      "Docker e Docker Compose para ambientes reproduzíveis",
      "Terraform e Bicep para infraestrutura como código",
      "Configuração de services PostgreSQL e Redis em CI",
      "Boas práticas de secrets e variáveis de ambiente",
    ],
    chips: ["GitHub Actions", "Docker", "Terraform", "Bicep", "CI/CD"],
  },
  // Programação
  {
    category: "Programação",
    subCategory: "Backend",
    title: "Backend — Node.js / Java / Python",
    items: [
      "NestJS com Prisma, JWT, guards e interceptors de produção",
      "Spring Boot com mensageria RabbitMQ (AMQP)",
      "Python: workers assíncronos, FastAPI, scripts de automação",
      "Controle de concorrência: pg_advisory_xact_lock, transações Serializable",
      "Cache-aside com Redis e invalidação por evento",
    ],
    chips: ["NestJS", "Spring Boot", "Python", "PostgreSQL", "Redis", "RabbitMQ"],
  },
  {
    category: "Programação",
    subCategory: "Frontend",
    title: "Frontend — Next.js / React",
    items: [
      "Next.js 15 com App Router, SSR e export estático",
      "TypeScript com tipagem forte e Zod para validação",
      "Styled Components, design responsivo e PWA",
      "SWR para data fetching e cache no cliente",
      "Integração com APIs REST e Anthropic SDK",
    ],
    chips: ["Next.js", "React", "TypeScript", "Styled Components", "PWA"],
  },
  {
    category: "Programação",
    subCategory: "Qualidade",
    title: "Testes & Engenharia de Qualidade",
    items: [
      "BDD com Cucumber — comportamento como contrato entre serviços",
      "Jest para unit e integração em NestJS com banco real",
      "Python unittest com mocking de dependências externas",
      "ADRs (Architecture Decision Records) para decisões rastreáveis",
      "Relatórios de qualidade e segurança antes de publicação",
    ],
    chips: ["Jest", "Cucumber", "BDD", "pytest", "ADR"],
  },
  // Metodologia
  {
    category: "Metodologia",
    subCategory: "AI Software Engineer Studio",
    title: "Spec-First & Documentação de Engenharia",
    items: [
      "AI Software Engineer Studio: pipeline de construção spec-first assistida por IA",
      "Context Pack, ADRs, Specs e Handoffs por projeto",
      "Relatórios de qualidade e segurança antes de publicação",
      "Narrativa técnica pública para cada decisão de design",
      "Conventional Commits e CI/CD como parte do processo",
    ],
    chips: ["ADR", "Spec-First", "Context Pack", "Studio", "CI/CD"],
  },
];
