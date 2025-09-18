// mock/hero.ts
import type { HeroContent } from "../types/hero";
import FotoPerfil from "@/public/assets/geral/fotoPerfil.jpg";
// Suponha que, no server, você já tenha gerado:
// const heroImageUrl = blobUrl("hero", "bg-portfolio-001.jpg");

export const heroContent: HeroContent = {
  title: "Cloud • IA • Full-Stack",
  subtitle:
    "Bem vindo ao meu portfólio! Sou Luiz Junior, desenvolvedor apaixonado por tecnologia e inovação.",
  imageUrl: FotoPerfil.src,
  imageAlt: "Texturas futuristas em azul e roxo",
  primaryCta: { label: "Conheça o Trabalho", href: "#about" },
  secondaryCta: { label: "Entre em Contato", href: "#contact" },
  badge: { text: "Agenda aberta para novos projetos" },
  stats: [{ label: "Repos Públicos", value: "28" }],
  scrollOffsetPx: 84,
};
