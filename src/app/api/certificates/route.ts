import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import CertificateModel from "@/models/Certificate";
import { z } from "zod";
import { cdn } from "@/config/cdn";

const CertificateSchema = z.object({
  id: z.string(),
  title: z.string(),
  org: z.string(),
  issueDate: z.string(),
  verifyUrl: z.string().url().optional(),
  imagePath: z.string(),
  tags: z.array(z.string()).optional(),
});

type CertificatePayload = z.infer<typeof CertificateSchema>;

export async function GET() {
  await dbConnect();

  const docs = await CertificateModel.find().lean();
  const sanitized = docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    org: doc.org,
    issueDate: doc.issueDate,
    verifyUrl: doc.verifyUrl,
    imagePath: doc.imagePath,
    tags: doc.tags,
  }));

  const payload = z.array(CertificateSchema).parse(sanitized) satisfies CertificatePayload[];

  const items = payload.map((item) => ({
    ...item,
    imageUrl: cdn(item.imagePath),
  }));

  return NextResponse.json({
    version: 1,
    updatedAt: new Date().toISOString(),
    items,
  });
}
