// mock/hero.ts
import type { HeroContent } from "../types/hero";
import FotoPerfil from "@/public/assets/geral/fotoPerfil.jpg";
// Suponha que, no server, você já tenha gerado:
// const heroImageUrl = blobUrl("hero", "bg-portfolio-001.jpg");

export const heroContent: HeroContent = {
  title: "AI Software Engineer · Full Stack Cloud",
  subtitle:
    "Construo sistemas com LLMs, arquiteturas cloud-native e pipelines event-driven. Projetos com padrão de produção, ADRs e CI — do zero à entrega.",
  imageUrl: FotoPerfil.src,
  imageAlt: "Luiz Júnior — AI Software Engineer",
  primaryCta: { label: "Ver Projetos", href: "#projects" },
  secondaryCta: { label: "Entre em Contato", href: "#contact" },
  badge: { text: "Aberto a oportunidades" },
  stats: [{ label: "Projetos públicos", value: "4" }],
  scrollOffsetPx: 84,
};
