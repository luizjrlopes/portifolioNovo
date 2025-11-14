import type { Competency } from "../types";

export const competencies: Competency[] = [
  // Inteligência Artificial & Machine Learning
  {
    category: "IA & Machine Learning",
    subCategory: "Generative AI",
    title: "Large Language Models (LLMs)",
    items: [
      "Desenvolvimento com OpenAI API (GPT-3.5, GPT-4)",
      "Prompt Engineering e Chain of Thought",
      "Retrieval Augmented Generation (RAG)",
      "Fine-tuning e customização de modelos",
      "Embedding e similarity search",
    ],
    chips: ["OpenAI", "Langchain", "Vector DB", "RAG", "Prompt Engineering"],
  },
  {
    category: "IA & Machine Learning",
    subCategory: "Generative AI",
    title: "AI Integration & Development",
    items: [
      "Integração de LLMs em aplicações web",
      "Desenvolvimento de chatbots inteligentes",
      "Processamento de linguagem natural (NLP)",
      "Análise de sentimentos e classificação de texto",
      "Automação de processos com IA generativa",
    ],
    chips: ["Python", "FastAPI", "Streamlit", "Hugging Face", "Azure OpenAI"],
  },
  {
    category: "IA & Machine Learning",
    subCategory: "Data Science",
    title: "Machine Learning Fundamentals",
    items: [
      "Algoritmos de classificação e regressão",
      "Análise exploratória de dados (EDA)",
      "Feature engineering e seleção de variáveis",
      "Validação de modelos e métricas de performance",
      "Deploy de modelos ML em produção",
    ],
    chips: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "MLOps"],
  },
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
    title: "Python para Data Science e IA",
    items: [
      "Python Fundamentals e estruturas de dados avançadas",
      "Programação orientada a objetos (OOP)",
      "Manipulação de dados com Pandas e NumPy",
      "Desenvolvimento de APIs com FastAPI e Flask",
      "Integração com serviços de IA e ML",
    ],
    chips: ["Pandas", "NumPy", "FastAPI", "Jupyter", "OpenAI API"],
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
