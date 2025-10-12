import type { Certificate } from "../types";
import MicrosoftFundamentals from "/public/assets/certificates/Microsoft_Professional_Certificate_Fundamentals.jpg";
import AnalistaCloud from "/public/assets/certificates/Analista_Cloud.jpg";
import BasicFrontend from "/public/assets/certificates/Basic_Frontend.jpg";
import BootCampSinqia from "/public/assets/certificates/BootCamp_Sinqia.jpg";
import BootcampSpringReact from "/public/assets/certificates/Bootcamp_Spring_React.jpg";
import CertificadoCTFL from "/public/assets/certificates/Certificado_Teste-CTFL-ISTQB_BSTQB.jpg";
import CertificadoUX from "/public/assets/certificates/Certificado_UX_Design_Rapido_e_Pratico.jpg";
import CertificadoXD from "/public/assets/certificates/Certificado_XD_Node_Mongo_React_ReactNative.jpg";
import CriandoRepo from "/public/assets/certificates/Criando_seu_Primeiro_Repositorio.jpg";
import CursoHacktrack from "/public/assets/certificates/Curso_Hacktrack.jpg";
import FormacaoEngCloud from "/public/assets/certificates/Formacao_Engenheiro_Cloud.jpg";
import IntroducaoCSharp from "/public/assets/certificates/Introducao_ao_CSharp_e_.NET.jpg";
import IntroGitGithub from "/public/assets/certificates/Introdução ao Git e ao GitHub-page-00001.jpg";
import JornadaAzure from "/public/assets/certificates/Jornada_Microsoft_Azure.png";

export const certificates: Certificate[] = [
  // Cloud
  {
    title: "AZ-900: Azure Fundamentals",
    issued: "Concluido em 2025",
    logo: MicrosoftFundamentals,
    alt: "Microsoft Logo",
    description:
      "Certificado de fundamentos Microsoft Azure, cobrindo conceitos de nuvem, serviços e segurança.",
    category: "Cloud",
  },
  {
    title: "Formação Engenheiro Cloud",
    issued: "Concluido em 2024",
    logo: FormacaoEngCloud,
    alt: "Formação Engenheiro Cloud",
    description:
      "Formação em práticas de engenharia de nuvem e design de soluções escaláveis.",
    category: "Cloud",
  },
  {
    title: "Analista Cloud",
    issued: "Concluido em 2023",
    logo: AnalistaCloud,
    alt: "Analista Cloud",
    description:
      "Capacitação focada em operação e monitoramento de ambientes em nuvem.",
    category: "Cloud",
  },
  // Programacao
  {
    title: "Basic Frontend",
    issued: "Concluido em 2022",
    logo: BasicFrontend,
    alt: "Basic Frontend",
    description:
      "Curso introdutório a desenvolvimento front-end: HTML, CSS e JavaScript básicos.",
    category: "Programacao",
  },
  {
    title: "Bootcamp Sinqia",
    issued: "Concluido em 2023",
    logo: BootCampSinqia,
    alt: "Bootcamp Sinqia",
    description:
      "Bootcamp focado em desenvolvimento web e boas práticas de engenharia de software.",
    category: "Programacao",
  },
  {
    title: "Bootcamp Spring + React",
    issued: "Concluido em 2023",
    logo: BootcampSpringReact,
    alt: "Bootcamp Spring React",
    description: "Formação prática em backend Java (Spring) e frontend React.",
    category: "Programacao",
  },
  {
    title: "Certificado XD / Node / React",
    issued: "Concluido em 2021",
    logo: CertificadoXD,
    alt: "Certificado XD Node React",
    description:
      "Curso cobrindo desenvolvimento fullstack com Node, React e design de interfaces (XD).",
    category: "Programacao",
  },
  {
    title: "Criando seu Primeiro Repositório",
    issued: "Concluido em 2022",
    logo: CriandoRepo,
    alt: "Criando Repositório",
    description:
      "Introdução ao Git e GitHub: fluxo de trabalho, commits e colaboração.",
    category: "Programacao",
  },
  {
    title: "Introdução ao C# e .NET",
    issued: "Concluido em 2022",
    logo: IntroducaoCSharp,
    alt: "Introdução C#",
    description: "Curso introdutório de programação em C# e .NET.",
    category: "Programacao",
  },
  {
    title: "Criando Projetos com GitHub",
    issued: "Concluido em 2021",
    logo: IntroGitGithub,
    alt: "GitHub",
    description:
      "Um passo a passo prático para criar e publicar repositórios no GitHub.",
    category: "Programacao",
  },
];
