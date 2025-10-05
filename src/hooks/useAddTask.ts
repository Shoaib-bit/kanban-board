import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Status } from "@/types/tasks";
import { http } from "@/lib/http";

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: {
      title: string;
      description?: string;
      status: Status;
    }) => {
      const res = await http.post(`/tasks`, newTask);
      if (!res.data) throw new Error("Failed to add task");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
