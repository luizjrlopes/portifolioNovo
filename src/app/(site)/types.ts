import type { ReactNode } from "react";
export type {
  NavLink,
  NavigationProps,
  NavClickHandler,
} from "./types/navigation";
export type { HeroCTA, HeroContent } from "./types/hero";

export type AboutContent = {
  imageUrl: string;
  description?: string;
  richDescription?: ReactNode;
};
export type MissionContent = {
  imageUrl: string;
  description?: string;
  richDescription?: ReactNode;
};

export interface CompetencyCategory {
  titulo: string;
  itens: string[];
  chips?: string[]; // opcional
}

export interface CompetenciesContent {
  titulo: string;
  blocos: CompetencyCategory[];
}

// types.ts (recorte)
export interface CompetencyCard {
  titulo: string;
  itens: string[];
  chips?: string[];
}

export interface CompetencySubTab {
  key: string; // "infra", "fullstack"
  label: string; // "Infraestrutura", "Full Stack"
  cards: CompetencyCard[];
}

export interface CompetencyTab {
  key: string; // "cloud", "devops", "prog", "ia"
  label: string; // "Cloud", "DevOps", "Programação", "IA"
  subTabs: CompetencySubTab[];
}

export interface CompetencyTabsContent {
  titulo: string; // "Competências"
  tabs: CompetencyTab[];
}

export interface Skill {
  titulo: string;
  itens: string[];
}

export interface SoftSkillsContent {
  titulo: string;
  blocos: Skill[];
}

export type ProjectPreview = {
  title: string;
  stack: string;
  href: string;
};

export type CertificateTab = {
  id: string;
  label: string;
};

export type CertificateCategoryItem = {
  title: string;
  issued: string;
  logo: string;
  alt: string;
};

export type CertificateCategories = Record<string, CertificateCategoryItem[]>;

export type ContactOption = {
  label: string;
  href: string;
  display: string;
};

export type ArticleSummary = {
  title: string;
  category: string;
  date: string;
  description: string;
  pdfUrl: string;
  cover: string;
};
