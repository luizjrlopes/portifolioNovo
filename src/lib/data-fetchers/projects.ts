import { projects as mockProjects } from "@/app/(site)/mock/projects";
import type { Project } from "@/app/(site)/types";
import { fetchData } from "./index";

export async function getProjects(): Promise<Project[]> {
  return fetchData({
    endpoint: "projects",
    mockData: mockProjects,
    devDelay: 500,
  });
}
