import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import ProjectModel from "@/models/Project";
import { z } from "zod";
import { cdn } from "@/config/cdn";

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

  const payload = z.array(ProjectSchema).parse(sanitized) satisfies ProjectPayload[];

  const items = payload.map((item) => ({
    ...item,
    imageUrl: item.imagePath ? cdn(item.imagePath) : undefined,
  }));

  return NextResponse.json({ items });
}
