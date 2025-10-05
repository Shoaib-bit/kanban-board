import { http } from "@/lib/http";
import type { Task } from "@/types/tasks";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      const res = await http.get<{ data: Task[] }>("/tasks");
      return res.data.data;
    },
    enabled: true,
  });
};
