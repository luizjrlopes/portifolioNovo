# CONTEXT PACK — app_portifolio

> Etapa: `02_CONTEXTO` | Status: APROVADO | Data: 2026-07-01

---

## Contexto do negocio

Portfolio publico de Luiz Junior — AI Software Engineer / Full Stack Cloud. Objetivo: demonstrar competencias tecnicas em IA, sistemas distribuidos e cloud-native para recrutadores e times de engenharia. Faz parte do plano de carreira para vagas de LLM Engineer / AI Engineer.

## Usuario alvo

- Recrutador tecnico (leitura rapida: badge, hero, projetos)
- Engenheiro senior (leitura tecnica: descricoes de projetos, tags, artigos)
- Potencial empregador (contato direto via secao de contato)

## Problema que resolve

Nenhuma presenca publica tecnica anterior alem do GitHub. O portfolio centraliza: identidade profissional, projetos com decisoes de arquitetura, artigos tecnicos e certificacoes.

## Escopo

### In-scope
- Single page portfolio: Hero, About, Projetos, Competencias, Artigos, Certificados, Contato
- Deploy estatico no GitHub Pages (repo: portifolioNovo)
- Conteudo gerenciado via mock files TypeScript (sem CMS, sem DB em producao)

### Out-of-scope
- CMS admin
- Autenticacao
- Blog com rotas dinamicas
- Versao SSR/servidor

## Repositorio

- GitHub: https://github.com/luizjrlopes/portifolioNovo
- Deploy: https://luizjrlopes.github.io/portifolioNovo/
- Stack: Next.js 15, TypeScript, styled-components, Embla Carousel

## Decisoes pre-existentes relevantes

- `next.config.ts`: basePath `/portifolioNovo` + `output: export` ativados via `BUILD_MODE=export`
- `src/lib/db.ts`: MongoDB guard — falha silenciosa quando `isStaticExport=true`, sem erro em producao
- API routes (`src/app/api/`) existem mas sao bypassed em export estatico
- Mock data (`src/app/(site)/mock/`) e a fonte de dados em producao
