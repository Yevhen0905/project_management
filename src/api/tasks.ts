import { apiClient } from "./axios";
import type { Task } from "@/types/task";

export const taskApi = {
  async getTasks(): Promise<Task[]> {
    const { data } = await apiClient.get("/tasks");
    return data;
  },
};
