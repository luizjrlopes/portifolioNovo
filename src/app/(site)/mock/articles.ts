// mock/articles.ts
import type { ArticleSummary } from "../types";

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
    url: "https://www.linkedin.com/pulse/computacao-em-nuvem-luiz-junior-lopes/",
    cover: "/assets/articles/covers/azure.jpg",
    createdAt: "2025-08-30T00:00:00.000Z",
    date: "2025-08-30",
    tags: ["Azure", "Certificacao"],
  },

  /* ============== IA ============== */
  {
    id: "genai-01",
    title: "Do Modelo ao Produto: LLM em Apps de Entrega",
    category: "IA",
    summary:
      "Como integrar LLMs em aplicacoes reais: da escolha do modelo a entrega em producao, com foco em latencia, custo e confiabilidade.",
    description:
      "Como integrar LLMs em aplicacoes reais: da escolha do modelo a entrega em producao, com foco em latencia, custo e confiabilidade.",
    url: "https://luizjrlopes.github.io/AI_Software_Engineering_Playbook/Artigos_Secundarios/01-do-modelo-ao-produto.html",
    createdAt: "2025-10-01T00:00:00.000Z",
    date: "2025-10-01",
    tags: ["LLM", "Arquitetura", "Producao"],
  },
  {
    id: "genai-03",
    title: "RAG: Retrieval-Augmented Generation",
    category: "IA",
    summary:
      "Padrao RAG na pratica: indexacao de documentos em vector DB, estrategias de chunking, re-ranking e metricas de qualidade (RAGAS).",
    description:
      "Padrao RAG na pratica: indexacao de documentos em vector DB, estrategias de chunking, re-ranking e metricas de qualidade (RAGAS).",
    url: "https://luizjrlopes.github.io/AI_Software_Engineering_Playbook/Artigos_Secundarios/03-rag-cardapios.html",
    createdAt: "2025-10-15T00:00:00.000Z",
    date: "2025-10-15",
    tags: ["RAG", "Vector DB", "LLM Engineering"],
  },
  {
    id: "genai-09",
    title: "Arquiteturas Event-Driven para IA",
    category: "IA",
    summary:
      "Como combinar mensageria assincrona com pipelines de IA: desacoplamento, resiliencia e processamento em background via RabbitMQ e Kafka.",
    description:
      "Como combinar mensageria assincrona com pipelines de IA: desacoplamento, resiliencia e processamento em background via RabbitMQ e Kafka.",
    url: "https://luizjrlopes.github.io/AI_Software_Engineering_Playbook/Artigos_Secundarios/09-arquiteturas-event-driven-ia.html",
    createdAt: "2025-11-01T00:00:00.000Z",
    date: "2025-11-01",
    tags: ["Event-Driven", "RabbitMQ", "Arquitetura"],
  },
  {
    id: "genai-10",
    title: "Testes Automatizados para Sistemas de IA",
    category: "IA",
    summary:
      "Estrategias de teste para sistemas com LLMs: output probabilistico, BDD para contratos entre servicos e avaliacao com Langfuse.",
    description:
      "Estrategias de teste para sistemas com LLMs: output probabilistico, BDD para contratos entre servicos e avaliacao com Langfuse.",
    url: "https://luizjrlopes.github.io/AI_Software_Engineering_Playbook/Artigos_Secundarios/10-testes-automatizados-sistemas-ia.html",
    createdAt: "2025-11-10T00:00:00.000Z",
    date: "2025-11-10",
    tags: ["Testes", "BDD", "LLMOps"],
  },
  {
    id: "genai-11",
    title: "Basico de MLOps e LLMOps",
    category: "IA",
    summary:
      "Fundamentos de MLOps aplicados a LLMs: versionamento de modelos e prompts, CI para pipelines de IA, monitoramento de drift e observabilidade.",
    description:
      "Fundamentos de MLOps aplicados a LLMs: versionamento de modelos e prompts, CI para pipelines de IA, monitoramento de drift e observabilidade.",
    url: "https://luizjrlopes.github.io/AI_Software_Engineering_Playbook/Artigos_Secundarios/11-basico-mlops-llmops.html",
    createdAt: "2025-11-20T00:00:00.000Z",
    date: "2025-11-20",
    tags: ["MLOps", "LLMOps", "CI/CD"],
  },
  {
    id: "genai-16",
    title: "Mitigacao de Alucinacoes em LLMs",
    category: "IA",
    summary:
      "Tecnicas praticas para reduzir alucinacoes: grounding com RAG, validacao de output com schemas e guardrails.",
    description:
      "Tecnicas praticas para reduzir alucinacoes: grounding com RAG, validacao de output com schemas e guardrails.",
    url: "https://luizjrlopes.github.io/AI_Software_Engineering_Playbook/Artigos_Secundarios/16-alucinacoes-llm-mitigacao.html",
    createdAt: "2025-12-01T00:00:00.000Z",
    date: "2025-12-01",
    tags: ["LLM", "Confiabilidade", "Guardrails"],
  },

  /* ============== DEVOPS ============== */

  /* ============== PROGRAMACAO ============== */
];
