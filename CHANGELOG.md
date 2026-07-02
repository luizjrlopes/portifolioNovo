# Changelog — app_portifolio

## [1.0.0] — 2026-07-01

### Identidade profissional

- Hero title atualizado: "AI Software Engineer · Full Stack Cloud"
- About reescrito: foco em LLMs, sistemas distribuidos, arquiteturas cloud-native
- Badge: "Aberto a oportunidades"

### Projetos

- Licitacao Lab: descricao tecnica com pg_advisory_xact_lock + Redis cache-aside + ADRs
- Microservice Shop: descricao com stack poliglota intencional + RabbitMQ + BDD
- AutoFlow IA: descricao com function calling + zero dependencias externas
- Organizador de Vida: descricao com Claude API + PWA + spec-first
- PoderosaNoParto removido (fora do escopo de carreira AI/Cloud)

### Competencias

- Reescrita completa: IA & LLMs, Cloud Azure, Programacao, Metodologia
- Adicionados: LangGraph, CrewAI, RAG, Function Calling, Langfuse, AZ-204/AI-102 em certificacao

### Artigos

- 6 artigos GenAI adicionados: LLM em producao, RAG, Event-Driven para IA, Testes de IA, MLOps/LLMOps, Mitigacao de Alucinacoes
- Import estatico de imagem removido de articles.ts

### Performance

- 15 imports estaticos de imagem removidos de certificates.ts
- Bundle estimado: ~157MB → ~5-10MB

### Studio (MF-22 retroativo)

- studio/ completo: Context Pack, ADR Stack, Specs, Qualidade, Seguranca, Narrativa, 4 Handoffs
- docs/adr/ criado: ADR-001 (static export), ADR-002 (mock data)
- CHANGELOG.md + ROADMAP.md criados
- README.md reescrito

## [0.1.0] — 2025

- Scaffolding inicial com create-next-app
- Estrutura de componentes (Hero, About, Projects, Competencies, Articles, Certificates, Contact)
- CI/CD configurado para GitHub Pages
- styled-components com SSR registry para App Router
