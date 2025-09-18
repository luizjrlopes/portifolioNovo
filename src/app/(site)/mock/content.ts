import type {
  CertificateCategories,
  CertificateTab,
  ContactOption,
  NavLink,
  ProjectPreview,
} from "../types";

export { heroContent } from "./hero";
export { aboutContent } from "./about";

export const navLinks: NavLink[] = [
  { id: "home", label: "Inicio", href: "#home" },
  { id: "about", label: "Sobre", href: "#about" },
  { id: "competencies", label: "Competências", href: "#competencies" },
  { id: "soft-skills", label: "Soft Skills", href: "#soft-skills" },
  { id: "projects", label: "Projetos", href: "#projects" },
  { id: "articles", label: "Artigos", href: "#articles" },
  { id: "certificates", label: "Certificados", href: "#certificates" },
  { id: "contact", label: "Contato", href: "#contact" },
];

export const projects: ProjectPreview[] = [
  {
    title: "Projeto 1",
    stack: "React, Node.js",
    href: "#",
  },
  {
    title: "Projeto 2",
    stack: "React, Node.js",
    href: "#",
  },
  {
    title: "Projeto 3",
    stack: "React, Node.js",
    href: "#",
  },
];

export const certificateTabs: CertificateTab[] = [
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "programacao", label: "Programacao" },
  { id: "ia", label: "IA" },
];

export const certificateCategories: CertificateCategories = {
  cloud: [
    {
      title: "AZ-900: Azure Fundamentals",
      issued: "Concluido em 2025",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Microsoft_logo_%282012%29.svg/1024px-Microsoft_logo_%282012%29.svg.png",
      alt: "Microsoft Logo",
    },
    {
      title: "Certified Solutions Architect",
      issued: "Concluido em 2024",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png",
      alt: "AWS Logo",
    },
    {
      title: "Associate Cloud Engineer",
      issued: "Concluido em 2024",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Google_Cloud_logo.svg/1024px-Google_Cloud_logo.svg.png",
      alt: "Google Cloud Logo",
    },
  ],
  devops: [],
  programacao: [],
  ia: [],
};

export const contactOptions: ContactOption[] = [
  {
    label: "E-mail",
    href: "mailto:luiz.junior@email.com",
    display: "luiz.junior@email.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/seu-perfil",
    display: "linkedin.com/in/seu-perfil",
  },
];

export const footerText = "Desenvolvido com carinho por Luiz Junior.";
