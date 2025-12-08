export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee?: string;
  status: "To do" | "In progress" | "Done";
  dueDate: string;
}
