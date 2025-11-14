import type { NextConfig } from "next";

// Nome do repositório para GitHub Pages (ajuste se necessário)
const isProd = process.env.NODE_ENV === "production";
const isExport = process.env.BUILD_MODE === "export";
// Para GitHub Pages de projeto (https://<user>.github.io/<repo>/), defina o nome do repo abaixo
// Para domínio customizado ou user page (https://<user>.github.io), deixe vazio
const repoName = "portifolioNovo";

const nextConfig: NextConfig = {
  // Configuração para exportação estática (necessário para GitHub Pages)
  output: isExport ? "export" : undefined,

  // Base path para GitHub Pages (https://username.github.io/repo-name/)
  basePath: isProd && isExport && repoName ? `/${repoName}` : "",

  // Asset prefix para servir assets corretamente (evita // nas URLs)
  assetPrefix: isProd && isExport && repoName ? `/${repoName}` : "",

  // Desabilitar otimização de imagens para export estático
  images: {
    unoptimized: isExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },

  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      fileName: process.env.NODE_ENV === "development",
    },
  },

  // Trailing slash para compatibilidade com GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
