import { defineStore } from "pinia";
import { projectApi } from "@/api/projects";
import type { Project } from "@/types/project";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    async fetchProjects() {
      try {
        this.projects = await projectApi.getProjects();
      } catch (error) {
        console.error("error:", error);
      }
    },

    async addProject(projectData: Omit<Project, "id">) {
      try {
        const newProject = await projectApi.createProject(projectData);
        this.projects.push(newProject);
      } catch (error) {
        console.error("error:", error);
      }
    },

    async updateProject(id: string, projectData: Partial<Project>) {
      try {
        const updatedProject = await projectApi.updateProject(id, projectData);
        const index = this.projects.findIndex((project) => project.id === id);
        if (index !== -1) {
          this.projects[index] = updatedProject;
        }
      } catch (error) {
        console.error("error:", error);
      }
    },

    async deleteProject(id: string) {
      try {
        await projectApi.deleteProject(id);
        this.projects = this.projects.filter((project) => project.id !== id);
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
});
