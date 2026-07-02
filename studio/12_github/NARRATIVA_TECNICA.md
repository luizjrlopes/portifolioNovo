# NARRATIVA TECNICA — app_portifolio

> Etapa: `12_GITHUB` | Status: APROVADO | Data: 2026-07-01

---

## O que este projeto demonstra

Portfolio pessoal de Luiz Junior — AI Software Engineer / Full Stack Cloud — construido com Next.js 15 App Router e deployado via GitHub Pages como export estatico.

Demonstra: integracao de SSR com styled-components no App Router, decisao consciente de build condicional via env vars, e manutencao de escotilha para migracao futura para SSR.

---

## Decisoes de design relevantes

### 1. Export estatico com build condicional

O `next.config.ts` nao tem `output: "export"` fixo. Le `process.env.BUILD_MODE === "export"` para ativar o modo estatico. Isso mantem `npm run dev` funcionando sem basePath (experiencia de dev limpa) enquanto `npm run build:export` gera o output correto para GitHub Pages com `basePath: /portifolioNovo`.

Alternativa rejeitada: hardcodar `output: "export"` no config. Rejeitada porque impossibilita desenvolvimento local de qualquer feature que dependa de rotas dinamicas no futuro.

### 2. Mock data como fonte de dados em producao

`src/app/(site)/mock/*.ts` sao TypeScript puro — nao ha banco de dados em producao. Conteudo e version-controlled: cada update de projeto, artigo ou certificado vira um commit.

Os MongoDB models (`src/models/`) e API routes (`src/app/api/`) existem mas sao bypassed em static export. Esta nao e tech debt — e uma escotilha documentada para migracao futura sem reescrita.

### 3. styled-components com SSR no App Router

Next.js App Router nao suporta styled-components por padrao. O projeto implementa `src/app/registry.tsx` (ServerStyleSheet) e `src/app/providers.tsx` conforme a documentacao oficial do styled-components para Next.js 13+. Sem isso, o primeiro render teria FOUC (flash of unstyled content).

---

## Por que cada dependencia existe

- `styled-components`: tema centralizado, CSS-in-JS com SSR support
- `embla-carousel-react`: carrossel de certificados — leve, acessivel, sem jQuery
- `lucide-react`: icones tree-shakeable
- `zod`: validacao de schema (disponivel para formulario de contato futuro)
- `mongoose`: escotilha de migracao SSR — nao executado em producao
- `swr`: data fetching para modo dev local com API routes

---

## Deploy

GitHub Actions (`.github/workflows/nextjs.yml`) faz deploy automatico a cada push em `main`. Build: `npm run build:export` → `out/` → GitHub Pages.
