// components/Hero/types.ts
export interface HeroCTA {
  label: string;
  href: string; // pode ser "#about" ou "/artigos"
  rel?: string;
  target?: "_blank" | "_self";
}

export interface HeroContent {
  title: string;
  subtitle?: string;
  imageUrl?: string; // URL final do Azure, já resolvida no server
  imageAlt?: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  badge?: { text: string }; // ex: "Disponível para projetos"
  stats?: Array<{ label: string; value: string }>; // pequenos números, opcional
  /**
   * Offset do header sticky para rolagem suave ao clicar no CTA âncora (#id)
   * Default: 80
   */
  scrollOffsetPx?: number;
}
