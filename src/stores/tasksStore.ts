import { defineStore } from "pinia";
import { taskApi } from "@/api/tasks";
import type { Task } from "@/types/task";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    async fetchTasks() {
      try {
        this.tasks = await taskApi.getTasks();
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
});
