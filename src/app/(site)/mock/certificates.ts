import type { CertificateCategories, CertificateTab } from "../types";

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
