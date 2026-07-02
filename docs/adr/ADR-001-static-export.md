# ADR-001: Static Export para GitHub Pages

**Data:** 2026-07-01  
**Status:** Aceito

## Contexto

Portfolio precisa de hosting com zero custo e deploy simples. Opcoes avaliadas: Vercel (SSR), GitHub Pages (static), Netlify (static/SSR).

## Decisao

Next.js com `output: "export"` ativado via `BUILD_MODE=export`. Deploy no GitHub Pages com `basePath: /portifolioNovo`.

Build condicional: `next.config.ts` le a env var para ativar export apenas no build de producao. Dev local roda sem basePath.

## Consequencias

- Zero custo de hosting
- Deploy automatico via GitHub Actions a cada push em main
- Sem servidor: API routes inacessiveis em producao (aceitavel — portfolio e estatico)
- `images.unoptimized: true` obrigatorio (Next.js nao pode otimizar sem servidor)
- Conteudo atualizado via commit (intencional: versionamento de historico profissional)

## Alternativas rejeitadas

- **Vercel**: custo potencial em escala; dependencia de plataforma para um portfolio pessoal
- **Netlify**: equivalente ao GitHub Pages em custo zero, mas ja estava configurado no GitHub
