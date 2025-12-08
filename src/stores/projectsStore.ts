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
  },
});
