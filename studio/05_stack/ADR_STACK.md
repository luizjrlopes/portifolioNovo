# ADR STACK — app_portifolio

> Etapa: `05_STACK` | Status: APROVADO | Data: 2026-07-01

---

## Stack adotada

| Camada | Tecnologia | Decisao |
|---|---|---|
| Framework | Next.js 15 (App Router) | Padrao de mercado React; App Router e o futuro da plataforma |
| Linguagem | TypeScript 5 | Type safety; `Certificate.logo: StaticImageData | string` evitou regressao no bundle fix |
| Estilo | styled-components 6 + SSR registry | Tema centralizado; `src/app/registry.tsx` para SSR no App Router |
| Deploy | GitHub Pages (static export) | Zero custo; dominio proprio ou subdominio gratuito |
| Dados | Mock files TypeScript | Zero dependencia externa; sem latencia; conteudo version-controlled |
| Carrossel | Embla Carousel | Leve, acessivel, sem jQuery |
| Icones | Lucide React | Tree-shakeable; zero bundle overhead dos icones nao usados |
| Validacao | Zod 4 | Schema validation (disponivel para uso futuro em forms de contato) |
| CI/CD | GitHub Actions (nextjs.yml) | Integracao nativa com GitHub Pages; zero config adicional |

## Decisoes nao-obvias

### styled-components com SSR no App Router
Next.js App Router nao suporta styled-components out-of-the-box. O projeto implementa `src/app/registry.tsx` (ServerStyleSheet collector) e `src/app/providers.tsx` conforme documentacao oficial. Alternativa (CSS Modules ou Tailwind) foi rejeitada para nao reescrever os componentes existentes.

### MongoDB + API routes como dead code intencional
`src/models/`, `src/app/api/`, `src/lib/db.ts` existem mas sao bypassed em static export. Esta e uma decisao de manutencao: se o portfolio precisar ser migrado para SSR com conteudo dinamico no futuro, a estrutura ja existe. Nao e tech debt — e escotilha de emergencia documentada.

### Build condicional via env var
`next.config.ts` le `BUILD_MODE === "export"` para ativar `output: "export"` e `basePath: /portifolioNovo`. Isso permite `npm run dev` local sem basePath (dev experience limpa) e `npm run build:export` para GitHub Pages.
