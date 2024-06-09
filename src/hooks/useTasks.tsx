import { createContext, useContext, useEffect, useState } from "react";
import { TaskType } from "../interfaces";
import { getTask } from "../utils";

const TasksContext = createContext<{
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}>({ tasks: [], setTasks: () => {} });

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const response = async () => {
      const data = await getTask();

      setTasks(data);
    };

    return () => {
      response();
    };
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};
