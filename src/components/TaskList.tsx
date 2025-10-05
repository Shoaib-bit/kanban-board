/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Loader2 } from "lucide-react";
import { useGetTasks } from "@/hooks/useGetTasks";
import type { Status, Task } from "@/types/tasks";
import { AddTask } from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { UpdateTask } from "./UpdateTask";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useUpdateTask } from "@/hooks/useUpdateTask";

const columns: { id: Status; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export const TaskList = () => {
  const { data, isFetching: loading } = useGetTasks();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { mutate } = useUpdateTask();

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  // Handle Drag + Drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Only change column (no reorder inside same col)
    if (source.droppableId === destination.droppableId) return;

    const taskId = Number(draggableId);
    const newStatus = destination.droppableId as Status;

    // Optimistic update UI
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // API call update
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      mutate({ ...task, status: newStatus });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-8">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          columns.map((col) => {
            const filterTasks = tasks.filter((t) => t.status === col.id);
            return (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <Card
                    className="w-[400px]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardHeader>
                      <p className="font-bold text-lg">{col.title}</p>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 max-h-[400px] overflow-auto">
                      {filterTasks.map((task, index) => (
                        <Draggable
                          draggableId={task.id.toString()}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task taskData={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                    <CardFooter>
                      <AddTask status={col.id} />
                    </CardFooter>
                  </Card>
                )}
              </Droppable>
            );
          })
        )}
      </div>
    </DragDropContext>
  );
};

// Single Task
const Task = ({ taskData }: { taskData: Task }) => {
  return (
    <Card className="w-full min-h-[150px] p-0 flex flex-col gap-0 justify-start">
      <CardHeader className="p-4 pb-1">
        <div className="flex justify-between">
          <p className="font-medium">{taskData.title}</p>
          <div className="flex justify-between items-center gap-4">
            <DeleteTask id={taskData.id} />
            <UpdateTask task={taskData} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm">{taskData.description}</p>
      </CardContent>
    </Card>
  );
};
