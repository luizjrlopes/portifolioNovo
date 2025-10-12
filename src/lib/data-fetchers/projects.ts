import { projects as mockProjects } from "@/app/(site)/mock/projects";
import type { Project } from "@/app/(site)/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects from API");
    }

    const data = await res.json();

    if (data.items.length === 0) {
      console.warn("API returned no projects, using mock data as fallback.");
      return mockProjects;
    }

    return data.items;
  } catch (error) {
    console.error(
      "Error fetching projects from API, falling back to mock data:",
      error
    );
    return mockProjects;
  }
}
