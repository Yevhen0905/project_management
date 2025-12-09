import { apiClient } from "./axios";
import type { Project } from "@/types/project";

export const projectApi = {
  async getProjects(): Promise<Project[]> {
    const { data } = await apiClient.get("/projects");
    return data;
  },

  async createProject(projectData: Omit<Project, "id">): Promise<Project> {
    const { data } = await apiClient.post("/projects", projectData);
    return data;
  },

  async updateProject(
    id: string,
    projectData: Partial<Project>
  ): Promise<Project> {
    const { data } = await apiClient.put(`/projects/${id}`, projectData);
    return data;
  },

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  },
};
