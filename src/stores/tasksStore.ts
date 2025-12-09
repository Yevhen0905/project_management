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

    async addTask(taskData: Omit<Task, "id">) {
      try {
        const newTask = await taskApi.createTask(taskData);
        this.tasks.push(newTask);
      } catch (error) {
        console.error("error:", error);
      }
    },

    async updateTask(id: string, taskData: Partial<Task>) {
      try {
        const updatedTask = await taskApi.updateTask(id, taskData);
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      } catch (error) {
        console.error("error:", error);
      }
    },

    async deleteTask(id: string) {
      try {
        await taskApi.deleteTask(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
});
