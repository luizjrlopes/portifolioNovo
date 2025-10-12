import type { Competency } from "../types";

export const competencies: Competency[] = [
  // Cloud
  {
    category: "Cloud",
    subCategory: "Infraestrutura",
    title: "Cloud Computing",
    items: [
      "Especialista em Microsoft Azure",
      "Arquitetura de soluções e serviços em nuvem",
      "Gerenciamento de identidades e governança",
      "Monitoramento, segurança e backup de recursos",
    ],
    chips: ["Azure AD / Entra ID", "AKS", "Functions", "Storage", "Monitor"],
  },
  {
    category: "Cloud",
    subCategory: "Dados",
    title: "Data Platform",
    items: [
      "Pipelines em nuvem (ETL/ELT)",
      "Lakes e Warehouses gerenciados",
      "Orquestração e observabilidade",
      "Catálogo e governança de dados",
    ],
    chips: ["ADF", "Databricks", "Synapse", "Purview"],
  },
  // Programação
  {
    category: "Programação",
    subCategory: "Full Stack",
    title: "Desenvolvimento Full Stack Javascript/TypeScript",
    items: [
      "Front-end: React.js, Next.js, HTML5, CSS3",
      "Back-end: Node.js, APIs RESTful",
      "Controle de versão: Git, GitHub",
      "Design responsivo e interfaces modernas",
    ],
    chips: ["TypeScript", "Styled-Components", "Axios", "Prisma/ORM", "CI/CD"],
  },
  {
    category: "Programação",
    subCategory: "Python",
    title: "Python Fundamentals",
    items: [
      "Python Fundamentals",
      "Data Structures with Python",
      "Object-Oriented Programming with Python",
      "Decorators, Iterators, and Data and File Manipulation in Python",
    ],
    chips: [],
  },
  // Soft Skills
  {
    category: "Soft Skills",
    subCategory: "Comunicação",
    title: "Comunicação",
    items: [
      "Comunicação clara e assertiva",
      "Escuta ativa e empatia",
      "Feedback construtivo (CNV)",
      "Apresentações técnicas para públicos diversos",
    ],
    chips: ["Clareza", "Storytelling", "Escrita técnica", "Facilitação"],
  },
  {
    category: "Soft Skills",
    subCategory: "Colaboração & Adaptabilidade",
    title: "Colaboração em equipes multidisciplinares",
    items: [
      "Co-criação e alinhamento de expectativas",
      "Documentação objetiva e registro de decisões (ADR)",
      "Revisões de código e pair programming",
      "Gestão de conflitos com foco no objetivo",
    ],
    chips: ["Empatia", "Transparência", "ADR", "Pairing"],
  },
  {
    category: "Soft Skills",
    subCategory: "Colaboração & Adaptabilidade",
    title: "Flexibilidade e resolução de problemas",
    items: [
      "Pensamento crítico e análise de trade-offs",
      "Experimentação/MVP orientada a métricas (KPI)",
      "Priorização sob pressão e ambiguidade",
      "Ciclos de aprendizado (post-mortem, 5 porquês)",
    ],
    chips: ["KPI", "MVP", "5 Porquês", "Kaizen"],
  },
  {
    category: "Soft Skills",
    subCategory: "Missão",
    title: "Missão Profissional",
    items: [
      "Impactar o mercado formando novos talentos",
      "Integrar melhores práticas de Cloud e Full Stack",
      "Promover inovação e crescimento sustentável",
    ],
    chips: [
      "Mentoria",
      "Boas práticas",
      "Cloud + Full Stack",
      "Sustentabilidade",
    ],
  },
];
