import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import ArticleModel from "@/models/Article";
import { z } from "zod";
import { cdn } from "@/config/cdn";

// Necessário para export estático
export const dynamic = "force-static";
export const revalidate = 3600;

const isStaticExport =
  process.env.BUILD_MODE === "export" ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  content: z.string().optional(),
  pdfPath: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().transform((d) => d.toISOString()),
});

type ArticlePayload = z.infer<typeof ArticleSchema>;

export async function GET() {
  try {
    if (isStaticExport) {
      return NextResponse.json({ items: [] });
    }
    await dbConnect();

    const docs = await ArticleModel.find().sort({ createdAt: -1 }).lean();

    const sanitized = docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      summary: doc.summary,
      content: doc.content,
      pdfPath: doc.pdfPath,
      category: doc.category,
      tags: doc.tags,
      createdAt: doc.createdAt,
    }));

    const payload = z.array(ArticleSchema).parse(sanitized);

    const items = payload.map((item) => ({
      ...item,
      pdfUrl: item.pdfPath ? cdn(item.pdfPath) : undefined,
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Se houver um erro de validação ou banco de dados, retorne um erro 500
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An internal error occurred while fetching articles." },
      { status: 500 }
    );
  }
}
