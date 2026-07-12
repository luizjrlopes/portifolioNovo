import type { Project } from "@/app/(site)/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "AI Software Engineer Studio — versão pública",
    description:
      "Versão pública e sanitizada de um método controlado para engenharia de software assistida por agentes de IA, com responsabilidade humana, contexto delimitado, decisões rastreáveis e gates de qualidade.",
    repoUrl:
      "https://github.com/luizjrlopes/AI-Software-Engineer-Studio-Versao-Publica",
    imagePath: "project-1.jpg",
    tags: ["AI Agents", "Software Engineering", "ADRs", "Quality Gates"],
  },
  {
    id: "2",
    title: "AutoFlow",
    description:
      "Agente de automação com function calling, zero dependências externas e API REST local. Classifica intenções, seleciona ferramentas e executa ações via dicionário FERRAMENTAS — mesmo padrão arquitetural de agentes LLM, implementado com Python stdlib puro. Demonstrável offline em qualquer máquina sem instalação.",
    repoUrl: "https://github.com/luizjrlopes/AutoFlow",
    imagePath: "project-1.jpg",
    tags: ["Python", "REST API", "Agent", "Function Calling", "SQLite"],
  },
  {
    id: "3",
    title: "Licitação Lab",
    description:
      "Plataforma de licitações com controle de concorrência real em lances simultâneos via pg_advisory_xact_lock em transação Serializable. Cache de ranking com Redis invalidado por evento — sem TTL, sem stale data. Auditoria completa de todas as ações por perfil (SUPPLIER / ADMIN). Decisões documentadas em ADRs.",
    repoUrl: "https://github.com/luizjrlopes/licitacao-lab",
    imagePath: "project-1.jpg",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Prisma", "React"],
  },
  {
    id: "4",
    title: "Microservice Shop",
    description:
      "Monorepo event-driven com stack poliglota intencional: order-service em Java/Spring Boot, scheduler-agent em Python, testes BDD em Node.js/Cucumber. O order-service publica eventos no RabbitMQ e retorna imediatamente — o scheduler consome e confirma de forma assíncrona. BDD como contrato entre serviços, não teste de unidade.",
    repoUrl: "https://github.com/luizjrlopes/microservice-shop",
    imagePath: "project-1.jpg",
    tags: ["Java", "Spring Boot", "Python", "RabbitMQ", "BDD", "Docker"],
  },
];
