# ADR-002: Mock Data como Fonte de Dados em Producao

**Data:** 2026-07-01  
**Status:** Aceito

## Contexto

Portfolio precisa exibir projetos, certificados, artigos e competencias. Opcoes: banco de dados (MongoDB), CMS headless (Contentful, Sanity), ou dados estaticos em TypeScript.

## Decisao

Dados de conteudo residem em `src/app/(site)/mock/*.ts` — arquivos TypeScript puros exportando arrays tipados. Em producao (static export), estes sao o source of truth.

MongoDB models (`src/models/`) e API routes (`src/app/api/`) existem mas sao bypassed em static export. Sao escotilha para migracao futura — nao tech debt.

## Consequencias

- Zero dependencia de servico externo em producao
- Zero latencia de fetch: dados embutidos no bundle JavaScript
- Conteudo version-controlled: cada update de projeto ou certificado e um commit com historico
- Update de conteudo requer conhecimento de TypeScript + commit + push
- Escotilha SSR disponivel: se o portfolio precisar de admin CMS no futuro, a estrutura MongoDB ja existe

## Alternativas rejeitadas

- **CMS headless**: over-engineering para um portfolio pessoal; adiciona dependencia de terceiro
- **JSON files**: menos type-safe; sem autocomplete no editor para campos como `Certificate.logo`
- **Hardcode em componentes**: impossibilita separacao de conteudo e apresentacao
