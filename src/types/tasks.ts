import type { User } from "./user";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  userId: number;
  created_at?: string;
  user?: User;
}

export type Status = "todo" | "in_progress" | "done";
