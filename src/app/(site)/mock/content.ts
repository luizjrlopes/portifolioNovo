import type {
  CertificateCategories,
  CertificateTab,
  ContactOption,
  NavLink,
  Project,
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

export const projects: Project[] = [
  {
    id: "portifolio-next",
    title: "Portfólio Luiz Junior",
    description:
      "Aplicação Next.js com design responsivo para apresentar experiências, artigos e conquistas em cloud.",
    stack: "Next.js • TypeScript • Styled-Components",
    tags: ["Next.js", "TypeScript", "Styled Components"],
    repoUrl: "https://github.com/luizjrlopes/portifolioNovo",
    liveUrl: "#projects",
  },
  {
    id: "azure-automation",
    title: "Automação Azure",
    description:
      "Infraestrutura como código para provisionar recursos Azure com monitoramento e alertas automatizados.",
    stack: "Terraform • Azure Monitor • GitHub Actions",
    tags: ["Azure", "IaC", "DevOps"],
    repoUrl: "https://github.com/luizjrlopes/azure-automation",
  },
  {
    id: "data-pipeline",
    title: "Pipeline de Dados Inteligente",
    description:
      "Pipeline ELT para ingestão, normalização e disponibilização de dados analíticos em Synapse Analytics.",
    stack: "Azure Data Factory • Databricks • Synapse",
    tags: ["Data", "ETL", "Synapse"],
    repoUrl: "https://github.com/luizjrlopes/data-pipeline",
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
