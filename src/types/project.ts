export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "active" | "pending" | "done";
  createdAt: string;
}
