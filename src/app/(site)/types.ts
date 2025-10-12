import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
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
  // aceita path público (string) ou StaticImageData quando importado via next/image
  logo: string | StaticImageData;
  alt: string;
  description?: string;
};

export type CertificateCategories = Record<string, CertificateCategoryItem[]>;

export type Certificate = {
  title: string;
  issued: string;
  logo: StaticImageData | string;
  alt: string;
  description?: string;
  category: string;
};

export type ContactOption = {
  label: string;
  href: string;
  display: string;
};

export type Competency = {
  category: string;
  subCategory: string;
  title: string;
  items: string[];
  chips: string[];
};

export type ArticleSummary = {
  id: string;
  title: string;
  summary?: string;
  category?: string;
  pdfUrl?: string;
  createdAt: string; // ou Date, dependendo da sua preferência
  tags?: string[];
  slug?: string;
  description?: string;
  date?: string;
  cover?: string;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  repoUrl?: string;
  liveUrl?: string;
  imagePath?: string;
  imageUrl?: string;
  tags?: string[];
};
