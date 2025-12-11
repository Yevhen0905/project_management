import { defineStore } from "pinia";
import { taskApi } from "@/api/tasks";
import type { Task } from "@/types/task";
import { useNotificationStore } from "./notification";

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

        const notificationStore = useNotificationStore();
        notificationStore.add({
          type: "success",
          message: "Your task has been created!",
        });
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

        const notificationStore = useNotificationStore();
        notificationStore.add({
          type: "success",
          message: "Your task has been updated!",
        });
      } catch (error) {
        console.error("error:", error);
      }
    },

    async deleteTask(id: string) {
      try {
        await taskApi.deleteTask(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);

        const notificationStore = useNotificationStore();
        notificationStore.add({
          type: "danger",
          message: "Your task has been deleted!",
        });
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
});
