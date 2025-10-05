/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Loader2 } from "lucide-react";
import { useGetTasks } from "@/hooks/useGetTasks";
import type { Status, Task } from "@/types/tasks";
import { AddTask } from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { UpdateTask } from "./UpdateTask";

const columns: { id: Status; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export const TaskList = () => {
  const { data, isFetching: loading } = useGetTasks();

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <div className="flex gap-8">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        columns.map((data: { id: Status; title: string }) => {
          const filterTasks: Task[] = tasks.filter(
            (task) => task.status == data.id
          );
          return <Columns columnData={data} list={filterTasks} key={data.id} />;
        })
      )}
    </div>
  );
};

const Columns = ({
  columnData,
  list,
}: {
  columnData: {
    id: Status;
    title: string;
  };
  list: Task[];
}) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <p className="font-bold text-lg">{columnData.title}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 max-h-[400px] overflow-auto">
        {list.map((listData) => (
          <Task taskData={listData} key={listData.id} />
        ))}
      </CardContent>
      <CardFooter>
        <AddTask status={columnData.id} />
      </CardFooter>
    </Card>
  );
};

const Task = ({ taskData }: { taskData: Task }) => {
  return (
    <Card className="w-full min-h-[150px] p-0 flex flex-col gap-0 justify-start">
      <CardHeader className="p-4 pb-1">
        <div className="flex justify-between">
          <p className="font-medium ">{taskData.title}</p>
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
