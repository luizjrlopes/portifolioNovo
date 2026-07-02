# HANDOFF: Stack → Qualidade

> Status: CONCLUIDO | Data: 2026-07-01

## Stack documentada

- Next.js 15 App Router + TypeScript + styled-components
- Build condicional via BUILD_MODE env var
- Mock data como fonte de producao; MongoDB como escotilha

## O que o proximo (Qualidade) precisa verificar

- Sem testes formais — declarar como limitacao intencional
- CI como guardiao de qualidade minimo (build quebra em erro TypeScript)
- Validar fixes do Gate P2: 15 imports estaticos removidos de certificates.ts, 6 artigos adicionados

## Limitacoes ja identificadas

- `mongoose` em dependencies (tech debt menor, zero impacto em export)
- Sem testes E2E
