import type { Project } from "@/app/(site)/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Licitacao Lab",
    description:
      "Plataforma de licitações com controle de concorrência real em lances simultâneos via pg_advisory_xact_lock em transação Serializable. Cache de ranking com Redis invalidado por evento — sem TTL, sem stale data. Auditoria completa de todas as ações por perfil (SUPPLIER / ADMIN). Decisões documentadas em ADRs.",
    repoUrl: "https://github.com/luizjrlopes/licitacao-lab",
    imagePath: "project-1.jpg",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Prisma", "React"],
  },
  {
    id: "2",
    title: "Microservice Shop",
    description:
      "Monorepo event-driven com stack poliglota intencional: order-service em Java/Spring Boot, scheduler-agent em Python, testes BDD em Node.js/Cucumber. O order-service publica eventos no RabbitMQ e retorna imediatamente — o scheduler consome e confirma de forma assíncrona. BDD como contrato entre serviços, não teste de unidade.",
    repoUrl: "https://github.com/luizjrlopes/microservice-shop",
    imagePath: "project-1.jpg",
    tags: ["Java", "Spring Boot", "Python", "RabbitMQ", "BDD", "Docker"],
  },
  {
    id: "3",
    title: "AutoFlow IA",
    description:
      "Agente de automação com function calling, zero dependências externas e API REST local. Classifica intenções, seleciona ferramentas e executa ações via dicionário FERRAMENTAS — mesmo padrão arquitetural de agentes LLM, implementado com Python stdlib puro. Demonstrável offline em qualquer máquina sem instalação.",
    repoUrl: "https://github.com/luizjrlopes/autoflow-ia",
    imagePath: "project-1.jpg",
    tags: ["Python", "REST API", "Agent", "Function Calling", "SQLite"],
  },
  {
    id: "4",
    title: "Organizador de Vida",
    description:
      "Plataforma pessoal modular com 9 áreas de vida integradas a um assistente via Claude API (Anthropic). Frontend Next.js 15 com App Router, backend Node.js/Express, MongoDB. Onboarding guiado, módulos dinâmicos criados pelo usuário e instalável como PWA. Construído com metodologia spec-first assistida por IA.",
    repoUrl: "https://github.com/luizjrlopes/app_organizador",
    imagePath: "project-1.jpg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Claude API", "PWA", "Express"],
  },
];
