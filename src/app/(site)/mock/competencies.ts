// mock/competenciesTabs.ts
import type { CompetencyTabsContent } from "../types";

export const competenciesTabsContent: CompetencyTabsContent = {
  titulo: "Competências",
  tabs: [
    {
      key: "cloud",
      label: "Cloud",
      subTabs: [
        {
          key: "infra",
          label: "Infraestrutura",
          cards: [
            {
              titulo: "Cloud Computing",
              itens: [
                "Especialista em Microsoft Azure",
                "Arquitetura de soluções e serviços em nuvem",
                "Gerenciamento de identidades e governança",
                "Monitoramento, segurança e backup de recursos",
              ],
              chips: [
                "Azure AD / Entra ID",
                "AKS",
                "Functions",
                "Storage",
                "Monitor",
              ],
            },
          ],
        },
        {
          key: "dados",
          label: "Dados",
          cards: [
            {
              titulo: "Data Platform",
              itens: [
                "Pipelines em nuvem (ETL/ELT)",
                "Lakes e Warehouses gerenciados",
                "Orquestração e observabilidade",
                "Catálogo e governança de dados",
              ],
              chips: ["ADF", "Databricks", "Synapse", "Purview"],
            },
          ],
        },
      ],
    },
    {
      key: "prog",
      label: "Programação",
      subTabs: [
        {
          key: "fullstack",
          label: "Full Stack",
          cards: [
            {
              titulo: "Desenvolvimento Full Stack Javascript/TypeScript",
              itens: [
                "Front-end: React.js, Next.js, HTML5, CSS3",
                "Back-end: Node.js, APIs RESTful",
                "Controle de versão: Git, GitHub",
                "Design responsivo e interfaces modernas",
              ],
              chips: [
                "TypeScript",
                "Styled-Components",
                "Axios",
                "Prisma/ORM",
                "CI/CD",
              ],
            },
          ],
        },
        {
          key: "Backend Python",
          label: "Python",
          cards: [
            {
              titulo: "Python Fundamentals",
              itens: [
                "Python Fundamentals",
                "Data Structures with Python",
                "Object-Oriented Programming with Python",
                "Decorators, Iterators, and Data and File Manipulation in Python",
              ],
              chips: [],
            },
          ],
        },
      ],
    },
    {
      key: "soft",
      label: "Soft Skills",
      subTabs: [
        {
          key: "communication",
          label: "Comunicação",
          cards: [
            {
              titulo: "Comunicação",
              itens: [
                "Comunicação clara e assertiva",
                "Escuta ativa e empatia",
                "Feedback construtivo (CNV)",
                "Apresentações técnicas para públicos diversos",
              ],
              chips: [
                "Clareza",
                "Storytelling",
                "Escrita técnica",
                "Facilitação",
              ],
            },
          ],
        },
        {
          key: "collab",
          label: "Colaboração & Adaptabilidade",
          cards: [
            {
              titulo: "Colaboração em equipes multidisciplinares",
              itens: [
                "Co-criação e alinhamento de expectativas",
                "Documentação objetiva e registro de decisões (ADR)",
                "Revisões de código e pair programming",
                "Gestão de conflitos com foco no objetivo",
              ],
              chips: ["Empatia", "Transparência", "ADR", "Pairing"],
            },
            {
              titulo: "Flexibilidade e resolução de problemas",
              itens: [
                "Pensamento crítico e análise de trade-offs",
                "Experimentação/MVP orientada a métricas (KPI)",
                "Priorização sob pressão e ambiguidade",
                "Ciclos de aprendizado (post-mortem, 5 porquês)",
              ],
              chips: ["KPI", "MVP", "5 Porquês", "Kaizen"],
            },
          ],
        },
        {
          key: "missao",
          label: "Missão",
          cards: [
            {
              titulo: "Missão Profissional",
              itens: [
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
          ],
        },
      ],
    },
    // você pode adicionar "devops", "ia" etc.
  ],
};
