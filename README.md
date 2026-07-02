# Portfolio — Luiz Junior

**AI Software Engineer | Full Stack Cloud**

Portfolio pessoal deployado em: https://luizjrlopes.github.io/portifolioNovo/

---

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **styled-components 6** com SSR registry para App Router
- **Embla Carousel** — carrossel de certificados
- **Lucide React** — icones tree-shakeable
- Deploy: **GitHub Pages** via static export

---

## Rodando localmente

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build para producao

```bash
npm run build:export
# Gera: ./out/ (static export com basePath /portifolioNovo)
```

---

## Atualizando conteudo

Todo o conteudo esta em `src/app/(site)/mock/`:

| Arquivo | O que edita |
|---|---|
| `hero.ts` | Titulo, subtitulo, badge, CTA |
| `about.ts` | Descricao profissional |
| `projects.ts` | Projetos de portfolio |
| `competencies.ts` | Habilidades tecnicas |
| `articles.ts` | Artigos publicados |
| `certificates.ts` | Certificacoes |

Commit + push em `main` dispara deploy automatico.

---

## Deploy

GitHub Actions (`.github/workflows/nextjs.yml`):
```
push main → npm ci → npm run build:export → GitHub Pages
```

---

## Arquitetura

- **Export estatico condicional**: `BUILD_MODE=export` ativa `output: "export"` no `next.config.ts`
- **Mock data em producao**: API routes e MongoDB existem mas sao bypassed em static export
- **SSR styled-components**: `src/app/registry.tsx` (ServerStyleSheet) evita FOUC no primeiro render
- Decisoes documentadas em `docs/adr/`

---

## Projetos destacados

- [Licitacao Lab](https://github.com/luizjrlopes/licitacao-lab) — NestJS, pg_advisory_xact_lock, Redis, ADRs
- [Microservice Shop](https://github.com/luizjrlopes/microservice-shop) — Java/Python/Node, RabbitMQ, BDD
- [AutoFlow IA](https://github.com/luizjrlopes/autoflow-ia) — Python, Function Calling, zero dependencias
- [Organizador de Vida](https://github.com/luizjrlopes/app_organizador) — Next.js, Claude API, PWA
