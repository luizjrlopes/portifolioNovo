// mock/hero.ts
import type { HeroContent } from "../types/hero";
import FotoPerfil from "@/public/assets/geral/fotoPerfil.png";
// Suponha que, no server, você já tenha gerado:
// const heroImageUrl = blobUrl("hero", "bg-portfolio-001.jpg");

export const heroContent: HeroContent = {
  title: "AI Software Engineer",
  subtitle:
    "Agentes de IA, RAG, automação, Full Stack e Cloud — com arquitetura, testes, segurança, observabilidade e operação.",
  imageUrl: FotoPerfil.src,
  imageAlt: "Luiz Júnior — AI Software Engineer",
  primaryCta: { label: "Ver Projetos", href: "#projects" },
  secondaryCta: { label: "Entre em Contato", href: "#contact" },
  badge: { text: "Aberto a oportunidades" },
  stats: [{ label: "Projetos públicos", value: "4" }],
  scrollOffsetPx: 84,
};
