import { useTasks } from "../../../hooks/useTasks";
import { deleteTask, getTask } from "../../../utils";

interface Props {
  left?: number;
  right?: number;
  item: string | undefined;
}

function ConfirmDelete({ left, right, item }: Props) {
  const { setTasks } = useTasks();
  const handleDelete = async () => {
    await deleteTask(item);
    await reFetchTask();
  };

  const reFetchTask = async () => {
    const updateTask = await getTask();
    setTasks(updateTask);
  };

  return (
    <div
      className={`absolute z-10 left-${left} right-${right} w-28 py-1 border border-gray-400 shadow-md rounded bg-white top-10 flex flex-col`}
    >
      <button
        onClick={handleDelete}
        className="text-indicator-3 pl-2 text-left"
      >
        Delete
      </button>
    </div>
  );
}

export default ConfirmDelete;
