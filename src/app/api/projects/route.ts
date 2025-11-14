import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import ProjectModel from "@/models/Project";
import { z } from "zod";
import { cdn } from "@/config/cdn";

// Necessário para export estático
export const dynamic = "force-static";
export const revalidate = 3600;

const isStaticExport =
  process.env.BUILD_MODE === "export" ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  imagePath: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type ProjectPayload = z.infer<typeof ProjectSchema>;

export async function GET() {
  if (isStaticExport) {
    return NextResponse.json({ items: [] });
  }
  await dbConnect();

  const docs = await ProjectModel.find().lean();
  const sanitized = docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    description: doc.description,
    repoUrl: doc.repoUrl,
    liveUrl: doc.liveUrl,
    imagePath: doc.imagePath,
    tags: doc.tags,
  }));

  const payload = z
    .array(ProjectSchema)
    .parse(sanitized) satisfies ProjectPayload[];

  const items = payload.map((item) => ({
    ...item,
    imageUrl: item.imagePath ? cdn(item.imagePath) : undefined,
  }));

  return NextResponse.json({ items });
}
