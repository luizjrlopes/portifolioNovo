import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import ArticleModel from "@/models/Article";
import { z } from "zod";
import { cdn } from "@/config/cdn";

const QuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});

const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  content: z.string().optional(),
  pdfPath: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
});

type ArticlePayload = z.infer<typeof ArticleSchema>;

type ArticlesResponse = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  items: (ArticlePayload & { pdfUrl?: string })[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = QuerySchema.parse({
    page: searchParams.get("page"),
    pageSize: searchParams.get("pageSize"),
  });

  await dbConnect();

  const total = await ArticleModel.countDocuments();
  const docs = await ArticleModel.find()
    .sort({ createdAt: -1 })
    .skip((query.page - 1) * query.pageSize)
    .limit(query.pageSize)
    .lean();

  const sanitized = docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    summary: doc.summary,
    content: doc.content,
    pdfPath: doc.pdfPath,
    tags: doc.tags,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
  }));

  const parsed = z.array(ArticleSchema).parse(sanitized) satisfies ArticlePayload[];

  const items = parsed.map((item) => ({
    ...item,
    pdfUrl: item.pdfPath ? cdn(item.pdfPath) : undefined,
  }));

  const body: ArticlesResponse = {
    page: query.page,
    pageSize: query.pageSize,
    total,
    totalPages: Math.ceil(total / query.pageSize),
    items,
  };

  return NextResponse.json(body);
}
