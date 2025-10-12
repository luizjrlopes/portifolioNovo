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

export const contactOptions: ContactOption[] = [
  {
    label: "E-mail",
    href: "mailto:luiz.junior@email.com",
    display: "luizjrlopes.tech@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luizjuniorlopes",
    display: "linkedin.com/in/luizjuniorlopes",
  },
];

export const footerText = "Desenvolvido com carinho por Luiz Junior.";
