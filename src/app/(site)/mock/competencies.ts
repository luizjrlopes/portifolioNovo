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
              titulo: "Desenvolvimento Full Stack",
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
          key: "mobile",
          label: "Mobile",
          cards: [
            {
              titulo: "Apps Móveis",
              itens: [
                "React Native",
                "Expo",
                "Integração com APIs",
                "Publicação e OTA",
              ],
              chips: ["RN CLI", "Expo Router"],
            },
          ],
        },
      ],
    },
    // você pode adicionar "devops", "ia" etc.
  ],
};
