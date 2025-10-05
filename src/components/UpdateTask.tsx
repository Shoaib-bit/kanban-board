"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";
import type { Status, Task } from "@/types/tasks";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { toast } from "sonner";

export const UpdateTask = ({ task }: { task: Task }) => {
  const { mutate, isPending } = useUpdateTask();

  const handleUpdate = (newStatus: Status) => {
    if (newStatus === task.status) return;
    mutate(
      { ...task, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Task updated to ${newStatus}`);
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isPending ? (
          <Loader2 className="size-4 animate-spin text-gray-500" />
        ) : (
          <EllipsisVertical className="size-4 cursor-pointer" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled={task.status === "todo" || isPending}
          onClick={() => handleUpdate("todo")}
        >
          Todo
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={task.status === "in_progress" || isPending}
          onClick={() => handleUpdate("in_progress")}
        >
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={task.status === "done" || isPending}
          onClick={() => handleUpdate("done")}
        >
          Done
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
