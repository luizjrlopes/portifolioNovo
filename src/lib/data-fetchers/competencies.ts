import { competencies as mockCompetencies } from "@/app/(site)/mock/competencies";
import type { Competency } from "@/app/(site)/types";
import { fetchData } from "./index";

export async function getCompetencies(): Promise<Competency[]> {
  return fetchData({
    endpoint: "competencies",
    mockData: mockCompetencies,
    devDelay: 200,
    transform: (item: any) => ({
      category: item.category,
      subCategory: item.subCategory,
      title: item.title,
      items: item.items ?? [],
      chips: item.chips ?? [],
    }),
  });
}
