import type { AboutContent } from "../types";
import FotoPerfil from "@/public/assets/geral/fotoPerfil.jpg";

export const aboutContent: AboutContent = {
  imageUrl: FotoPerfil.src,
  description: `
Sou AI Software Engineer com foco em sistemas distribuídos, LLMs e arquiteturas cloud-native. Construo do zero: do design de APIs e decisões de arquitetura (ADRs) até pipelines CI/CD e integração com modelos de linguagem.

Meus projetos combinam padrões de produção reais — controle de concorrência com pg_advisory_xact_lock, mensageria assíncrona com RabbitMQ, agentes com function calling — com documentação de engenharia que explica o porquê de cada decisão, não só o como.

Uso o AI Software Engineer Studio, uma metodologia própria de construção spec-first assistida por IA, que produz sistemas com Context Pack, ADRs, relatórios de qualidade e segurança, e narrativa técnica pública.

Graduando em Análise e Desenvolvimento de Sistemas. Em certificação: AZ-204 (Azure Developer) e AI-102 (Azure AI Engineer).
`,
};
