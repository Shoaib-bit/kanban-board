import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Status } from "@/types/tasks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddTask } from "@/hooks/useAddTask";
import * as yup from "yup";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";

type TaskFormValues = {
  title: string;
  description: string;
};

const taskSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().default(""),
});

export function AddTask({ status }: { status: Status }) {
  const addTask = useAddTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    const taskData = {
      title: data.title,
      description: data.description || undefined,
      status,
    };

    addTask.mutate(taskData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="title">
              Title<span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter Title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter Description "
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={addTask.isPending}>
              {addTask.isPending ? <Loader2 className="animate-spin" /> : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
