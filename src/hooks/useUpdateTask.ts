import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/types/tasks";
import { http } from "@/lib/http";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Task) => {
      const res = await http.patch(`/tasks/${task.id}`, {
        status: task.status,
      });
      if (!res.data) throw new Error("Failed to update task");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
