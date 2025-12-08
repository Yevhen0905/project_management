import { apiClient } from "./axios";
import type { Project } from "@/types/project";

export const projectApi = {
  async getProjects(): Promise<Project[]> {
    const { data } = await apiClient.get("/projects");
    return data;
  },
};
