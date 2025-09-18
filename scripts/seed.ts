import path from "node:path";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import mongoose from "mongoose";
import { config as loadEnv } from "dotenv";
import { dbConnect } from "@/lib/db";
import ArticleModel from "@/models/Article";
import CertificateModel from "@/models/Certificate";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });

const LEGACY_ROOT = process.env.LEGACY_PORTFOLIO_PATH
  ? path.resolve(process.env.LEGACY_PORTFOLIO_PATH)
  : path.resolve(process.cwd(), "..", "portifolioNovo");

const ARTICLES_INDEX_PATH = path.resolve(LEGACY_ROOT, "public", "mock", "articles_index.json");
const ARTICLES_DIR = path.resolve(LEGACY_ROOT, "public", "mock", "articles");

type LegacyArticleIndex = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  publishedAt?: string;
};

type LegacyArticle = LegacyArticleIndex & {
  content?: string;
  pdfPath?: string;
};

function normalizeAssetPath(input?: string | null) {
  if (!input) {
    return undefined;
  }

  try {
    const url = new URL(input);
    return url.pathname.replace(/^\/+/, "");
  } catch (error) {
    return String(input).replace(/^\/+/, "");
  }
}

async function seedArticles() {
  if (!existsSync(ARTICLES_INDEX_PATH)) {
    console.warn(`Arquivo não encontrado: ${ARTICLES_INDEX_PATH}`);
    return;
  }

  const raw = await readFile(ARTICLES_INDEX_PATH, "utf-8");
  const items = JSON.parse(raw) as LegacyArticleIndex[];

  for (const item of items) {
    const articlePath = path.resolve(ARTICLES_DIR, `${item.slug}.json`);
    let fullArticle: LegacyArticle = item;

    if (existsSync(articlePath)) {
      const articleRaw = await readFile(articlePath, "utf-8");
      fullArticle = JSON.parse(articleRaw) as LegacyArticle;
    }

    const createdAt = fullArticle.publishedAt ? new Date(fullArticle.publishedAt) : undefined;

    await ArticleModel.updateOne(
      { id: fullArticle.slug },
      {
        $set: {
          id: fullArticle.slug,
          title: fullArticle.title,
          summary: fullArticle.description,
          content: fullArticle.content,
          pdfPath: normalizeAssetPath(fullArticle.pdfPath),
          tags: fullArticle.tags,
          createdAt,
        },
      },
      { upsert: true }
    );
  }

  console.info(`Importados ${items.length} artigos.`);
}

async function seedCertificates() {
  const certificates = [
    {
      id: "microsoft-az900",
      title: "Azure Fundamentals",
      org: "Microsoft",
      issueDate: "2024-07-10",
      verifyUrl: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/",
      imagePath: "certificates/azure-fundamentals.png",
      tags: ["Azure", "Cloud"],
    },
    {
      id: "aws-cloud-practitioner",
      title: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      issueDate: "2023-11-02",
      verifyUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      imagePath: "certificates/aws-cloud-practitioner.png",
      tags: ["AWS", "Cloud"],
    },
    {
      id: "alura-react-architect",
      title: "React Front-end Architect",
      org: "Alura",
      issueDate: "2025-01-15",
      imagePath: "certificates/alura-react-architect.png",
      tags: ["React", "Front-end"],
    },
  ];

  for (const certificate of certificates) {
    await CertificateModel.updateOne({ id: certificate.id }, { $set: certificate }, { upsert: true });
  }

  console.info(`Seed de certificados concluído (${certificates.length}).`);
}

async function main() {
  await dbConnect();
  await seedArticles();
  await seedCertificates();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
