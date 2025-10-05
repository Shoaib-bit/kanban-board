import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { toast } from "sonner";

export function DeleteTask({ id }: { id: number }) {
  const deleteTask = useDeleteTask();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="size-4 cursor-pointer text-red-500 hover:text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The task will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTask.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteTask.isPending}
            onClick={() =>
              deleteTask.mutate(id, {
                onSuccess: () => {
                  toast.success("Task deleted successfully");
                },
              })
            }
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteTask.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
