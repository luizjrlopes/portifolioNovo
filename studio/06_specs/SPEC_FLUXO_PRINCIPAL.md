# SPEC — Fluxo Principal: app_portifolio

> Etapa: `06_SPECS` | Status: APROVADO | Data: 2026-07-01

---

## Fluxo critico 1: Carregamento da pagina principal

```
Usuario acessa https://luizjrlopes.github.io/portifolioNovo/
  → Browser carrega index.html estatico (out/ directory)
  → styled-components inject styles (SSR-safe via registry)
  → Navigation monta com useActiveSection (IntersectionObserver)
  → Secoes renderizam com dados dos mock files:
      hero.ts → HeroSection
      about.ts → AboutSection
      projects.ts → ProjectsSection
      competencies.ts → CompetenciesSection
      articles.ts → ArticlesSection
      certificates.ts → CertificatesSection
  → Imagens carregam via Next.js Image (unoptimized=true para export)
```

**Critico**: mock files sao a unica fonte de dados. Qualquer alteracao de conteudo requer commit + redeploy.

---

## Fluxo critico 2: Navegacao por secoes

```
Usuario clica em item do nav ("Projetos")
  → useNavigation dispara scroll suave com offset de 84px (height da navbar)
  → useActiveSection detecta secao visivel via IntersectionObserver
  → Nav item ativo e atualizado visualmente
```

**Decisao**: offset de 84px e configuravel em `hero.ts` via `scrollOffsetPx: 84`.

---

## Fluxo critico 3: Deploy automatico

```
Push para branch main
  → GitHub Actions nextjs.yml dispara
  → npm ci (cache de node_modules via actions/cache)
  → npm run build:export (next build com BUILD_MODE=export)
  → out/ gerado com basePath /portifolioNovo
  → .nojekyll adicionado (impede Jekyll de processar _next/ como template)
  → upload-pages-artifact + deploy-pages
  → Site ao vivo em https://luizjrlopes.github.io/portifolioNovo/
```

---

## Limitacoes documentadas

| Item | Status | Impacto |
|---|---|---|
| Conteudo estatico | Intencional | Update de conteudo = commit + push |
| Sem formulario de contato funcional | Roadmap | Secao de contato exibe email direto |
| Images nao otimizadas (unoptimized: true) | Obrigatorio para export | Sem lazy resize; mitigado com imagens pre-dimensionadas |
| API routes inacessiveis em producao | Intencional | MongoDB/SSR disponivel apenas em dev local |
