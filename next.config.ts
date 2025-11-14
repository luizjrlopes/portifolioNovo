import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      // Adiciona configurações extras para styled-components
      ssr: true,
      displayName: true,
      fileName: process.env.NODE_ENV === "development",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  // Removendo otimizações experimentais que podem causar problemas
};

export default nextConfig;
