import { useEffect, useState } from "react";
import Loader from "../../atoms/loading";
import { useUser } from "../../../hooks/useUser";
import { getTask, postTask } from "../../../utils";
import { useTasks } from "../../../hooks/useTasks";
import RenderItem from "../../molecules/task/renderItem";
import FormTask from "../../molecules/task/form";
import { TaskType } from "../../../interfaces";

const initialValue = {
  title: "",
  finishedAt: "",
  description: "",
};

function TaskMainComponent() {
  const { userId } = useUser();
  const { setTasks } = useTasks();
  const [loadVisible, setLoadVisible] = useState<boolean>(true);
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      setLoadVisible(false);
    }, 1000);
  }, []);

  const handleAddTask = async () => {
    if (formData === initialValue) {
      return alert("Please give title and finish time before adding new task");
    }
    const data: TaskType = {
      title: formData.title,
      finishedAt: formData.finishedAt,
      description: formData.description,
      userId: userId || "",
    };

    try {
      const newTask = await postTask(data);
      alert("Task added successfully");
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setFormData(initialValue);
      await reFetchTask();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const reFetchTask = async () => {
    const updateTask = await getTask();
    setTasks(updateTask);
  };

  return (
    <div className="bg-white h-full w-full flex flex-col px-5 overflow-hidden">
      <div className="flex mt-5 items-center justify-between py-1 px-16 w-full gap-3 outline-none">
        <select className="border px-4 py-2 rounded border-primary-3">
          <option value="">My Task</option>
          <option value="">Personal Errands</option>
          <option value="">Urgent To-Do</option>
        </select>
        <button onClick={handleAddTask} className="btn-primary px-4 py-2">
          New Task
        </button>
      </div>
      <div className="flex-1 w-full h-full">
        {loadVisible && (
          <div className="flex justify-center items-center h-full">
            <Loader w={16} h={16} text="Loading Chats..." />
          </div>
        )}
        {!loadVisible && (
          <div className="mt-5 h-full pb-32 overflow-y-scroll flex flex-col gap-5">
            <RenderItem />
            <FormTask formData={formData} setFormData={setFormData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskMainComponent;
