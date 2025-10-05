import { http } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await http.delete(`/tasks/${id}`);
      if (!res.data) throw new Error("Failed to delete task");
      return res.data;
    },
    onSuccess: () => {
      // Refetch tasks after delete
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
