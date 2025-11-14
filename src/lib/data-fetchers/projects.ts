import { projects as mockProjects } from "@/app/(site)/mock/projects";
import type { Project } from "@/app/(site)/types";

// Detecta a porta atual durante o runtime
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

export async function getProjects(): Promise<Project[]> {
  // Retorna dados mock imediatamente para desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProjects), 500); // Simula delay de rede
    });
  }

  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/projects`, {
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
