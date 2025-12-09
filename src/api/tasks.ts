import { apiClient } from "./axios";
import type { Task } from "@/types/task";

export const taskApi = {
  async getTasks(): Promise<Task[]> {
    const { data } = await apiClient.get("/tasks");
    return data;
  },

  async createTask(taskData: Omit<Task, "id">): Promise<Task> {
    const { data } = await apiClient.post("/tasks", taskData);
    return data;
  },

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const { data } = await apiClient.put(`/tasks/${id}`, taskData);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
