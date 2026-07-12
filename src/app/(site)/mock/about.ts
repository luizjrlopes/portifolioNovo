import type { AboutContent } from "../types";
import FotoPerfil from "@/public/assets/geral/fotoPerfil.png";

export const aboutContent: AboutContent = {
  imageUrl: FotoPerfil.src,
  description: `
Construo aplicações com inteligência artificial, agentes, RAG, automação, APIs e sistemas web. Minha base em desenvolvimento Full Stack e Microsoft Azure sustenta uma abordagem que considera arquitetura, testes, segurança, observabilidade e operação — não apenas a integração com o modelo.

Meu foco é usar IA dentro de sistemas controlados, com regras claras, validação de saída, logs, fallback, limites de autoridade e revisão humana quando a ação envolve risco.

Desenvolvo uma versão pública e sanitizada do meu método para engenharia de software assistida por agentes. Ele mantém explícitas a responsabilidade humana, a seleção de contexto, os limites de autoridade e os gates de qualidade.

Sou Microsoft Certified Trainer (MCT), Microsoft Certified: Azure Administrator Associate e Microsoft Certified: Azure Fundamentals. Também curso Análise e Desenvolvimento de Sistemas na Descomplica Faculdade Digital.
`,
};
