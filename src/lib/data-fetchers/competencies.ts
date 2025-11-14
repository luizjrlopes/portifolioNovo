import { competencies as mockCompetencies } from "@/app/(site)/mock/competencies";
import type { Competency } from "@/app/(site)/types";

// Detecta a porta atual durante o runtime
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

export async function getCompetencies(): Promise<Competency[]> {
  // Retorna dados mock imediatamente para desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCompetencies), 200);
    });
  }
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/competencies`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch competencies from API");
    }

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!items.length) {
      console.warn(
        "API returned no competencies, using mock data as fallback."
      );
      return mockCompetencies;
    }

    return items.map((item: any) => ({
      category: item.category,
      subCategory: item.subCategory,
      title: item.title,
      items: item.items ?? [],
      chips: item.chips ?? [],
    }));
  } catch (error) {
    console.error(
      "Error fetching competencies from API, falling back to mock data:",
      error
    );
    return mockCompetencies;
  }
}
