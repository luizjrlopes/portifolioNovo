import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import CompetencyModel from "@/models/Competency";
import { z } from "zod";

const CompetencySchema = z.object({
  id: z.string(),
  category: z.string(),
  subCategory: z.string(),
  title: z.string(),
  items: z.array(z.string()),
  chips: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    await dbConnect();
    const competencies = await CompetencyModel.find({}).lean();

    const sanitized = competencies.map((doc: any) => ({
      id: doc._id.toString(),
      category: doc.category,
      subCategory: doc.subCategory,
      title: doc.title,
      items: doc.items,
      chips: doc.chips,
    }));

    const payload = z.array(CompetencySchema).parse(sanitized);

    return NextResponse.json({ items: payload });
  } catch (error) {
    console.error("Error fetching competencies:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
}
