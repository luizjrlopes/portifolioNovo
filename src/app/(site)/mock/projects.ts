import type { Project } from "@/app/(site)/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "microservice-shop",
    description:
      "Microservice Shop é uma plataforma de pedidos pensada para demonstrar padrões de mensageria e automação com serviços independentes. O monorepo inclui um serviço Java para gerenciamento de pedidos, um worker Python que confirma pedidos de forma assíncrona, além de testes BDD em TypeScript. A stack padrão utiliza Docker Compose para expor HTTP, AMQP e ferramentas de observabilidade prontas para laboratório.",
    repoUrl: "https://github.com/luizjrlopes/microservice-shop",
    // liveUrl: "https://meu-portfolio.com",
    imagePath: "project-1.jpg",
    tags: ["Java", "Python", "Makefile", "TypeScript", "Gherkin", "Dockerfile"],
  },
  {
    id: "2",
    title: "PoderosaNoParto",
    description:
      "Microservice Shop é uma plataforma de pedidos pensada para demonstrar padrões de mensageria e automação com serviços independentes. O monorepo inclui um serviço Java para gerenciamento de pedidos, um worker Python que confirma pedidos de forma assíncrona, além de testes BDD em TypeScript. A stack padrão utiliza Docker Compose para expor HTTP, AMQP e ferramentas de observabilidade prontas para laboratório.",
    repoUrl: "https://github.com/luizjrlopes/PoderosaNoParto",
    // liveUrl: "https://meu-portfolio.com",
    imagePath: "project-1.jpg",
    tags: ["JavaScript", "Python"],
  },
];
