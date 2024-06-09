import { useState } from "react";
import { EachElement } from "../../atoms/EachElement";
import { TaskType } from "../../../interfaces";
import ConfirmDelete from "./confirm";
import { useTasks } from "../../../hooks/useTasks";
import { differenceInDays } from "date-fns";
import { formatDateOnly } from "../../../utils/formatDate";
import {
  deleteIsDownTask,
  getTask,
  postIsDownTask,
  postTaskType,
} from "../../../utils";
import Loader from "../../atoms/loading";

const types = [
  { name: "Important ASAP", color: "#E9F3FF" },
  { name: "Offline Meeting", color: "#FDCFA4" },
  { name: "Virtual Meeting", color: "#F9E9C3" },
  { name: "ASAP", color: "#AFEBDB" },
  { name: "Client Related", color: "#CBF1C2" },
  { name: "Self Task", color: "#CFCEF9" },
  { name: "Appointments", color: "#F9E0FD" },
  { name: "Court Related", color: "#9DD0ED" },
];

function RenderItem() {
  const { tasks, setTasks } = useTasks();
  const initialIsDown = tasks.map((task) => task.type === "down");
  const [isVisible, setIsVisible] = useState<boolean[]>(
    Array(tasks.length).fill(true)
  );
  const [isDown, setIsDown] = useState<boolean[]>(initialIsDown);
  const [popVisible, setPopVisible] = useState<boolean[]>(
    Array(tasks.length).fill(false)
  );
  const [isModal, setIsModal] = useState<boolean[]>(
    Array(tasks.length).fill(false)
  );
  const [selectedTypes, setSelectedTypes] = useState<{
    [key: string]: string[];
  }>({});
  const [isSubmitTypeTask, setIsSubmitTypeTask] = useState<{
    [key: string]: string[];
  }>({});

  const handlePopVisible = (id: number) => {
    setPopVisible((prev) => {
      const newVisibleIndices = [...prev];
      newVisibleIndices[id] = !newVisibleIndices[id];
      return newVisibleIndices;
    });
  };

  const handleVisibleContent = (index: number) => {
    setIsVisible((prev) => {
      const newVisibleIndices = [...prev];
      newVisibleIndices[index] = !newVisibleIndices[index];
      return newVisibleIndices;
    });
    setIsModal(isModal.map(() => false));
  };

  const handleVisibleModal = (index: number) => {
    setIsModal((prev) => {
      const newVisibleIndices = [...prev];
      newVisibleIndices[index] = !newVisibleIndices[index];
      return newVisibleIndices;
    });
  };

  const handleChangeInput = async (index: number, id: string | undefined) => {
    setIsDown((prev) => {
      const newCheckedIndices = [...prev];
      newCheckedIndices[index] = !newCheckedIndices[index];
      return newCheckedIndices;
    });

    const status = isDown[index] ? "onGoing" : "down";

    await postIsDownTask(status, id ?? "");
  };

  const handleTypeClick = async (index: number, type: string, id: string) => {
    setIsSubmitTypeTask((prev) => {
      const newSubmitTypeTask = { ...prev };
      newSubmitTypeTask[index] = !prev[index] ? [] : prev[index];
      return newSubmitTypeTask;
    });
    setSelectedTypes((prev) => {
      const currentSelectedTypes = prev[id] || [];
      const newSelectedTypes = currentSelectedTypes.includes(type)
        ? currentSelectedTypes.filter((item) => item !== type)
        : [...currentSelectedTypes, type];

      const updatedSelectedTypes = { ...prev, [id]: newSelectedTypes };

      return updatedSelectedTypes;
    });

    const data = {
      taskId: id ?? "",
      name: type ?? "",
    };

    await postTaskType(data);
    await reFetchTask();
    setIsSubmitTypeTask({});
  };

  const deleteTaskType = async (index: number, id: string | undefined) => {
    setIsSubmitTypeTask((prev) => {
      const newSubmitTypeTask = { ...prev };
      newSubmitTypeTask[index] = !prev[index] ? [] : prev[index];
      return newSubmitTypeTask;
    });
    await deleteIsDownTask(id);
    await reFetchTask();
    setIsSubmitTypeTask({});
  };

  const reFetchTask = async () => {
    const updateTask = await getTask();

    setTasks(updateTask);
  };

  const calculateDaysLeft = (finishedAt: string) => {
    const finishDate = new Date(finishedAt);
    const now = new Date();
    const diffInDays = differenceInDays(finishDate, now);
    return diffInDays;
  };

  return (
    <EachElement
      of={tasks}
      render={(item: TaskType, index: number) => {
        return (
          <div
            key={item.id}
            className="flex gap-2 pb-4 border-b items-start border-gray-400"
          >
            <input
              id={`duty-check-${item.id}`}
              type="checkbox"
              onChange={() => handleChangeInput(index, item.id)}
              className="mt-2"
              checked={isDown[index]}
            />
            <div className="flex-1 relative">
              <div className="flex items-center justify-between relative">
                <label
                  htmlFor={`duty-check-${item.id}`}
                  className={`font-semibold w-96 ${
                    isDown[index]
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  } `}
                >
                  {item.title}
                </label>
                <span
                  className={`text-sm text-red-500 ${
                    isDown[index] ? "hidden" : "block"
                  }`}
                >
                  {calculateDaysLeft(item.finishedAt)} Days Left
                </span>
                <span className="text-sm text-gray-600">
                  {formatDateOnly(item.createdAt)}
                </span>
                <button onClick={() => handleVisibleContent(index)}>
                  <img
                    src={
                      isVisible[index]
                        ? "../images/up.png"
                        : "../images/down.png"
                    }
                    alt="Arrow"
                    width={10}
                  />
                </button>
                <button onClick={() => handlePopVisible(index)}>
                  <img src="../images/menu-gray.png" alt="menu" />
                </button>
                {popVisible[index] && (
                  <ConfirmDelete item={item.id} right={0} />
                )}
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isVisible[index] ? "max-h-60" : "max-h-0"
                }`}
                style={{ transitionProperty: "max-height" }}
              >
                <div className={`flex items-center gap-2 my-3  `}>
                  <img
                    src="../images/clock.png"
                    alt="clock"
                    className="flex w-6 h-6"
                  />
                  <label
                    htmlFor="finishDate"
                    className="w-36 border border-gray-400 rounded px-4 py-2 flex justify-between items-center"
                  >
                    <span>{formatDateOnly(item.finishedAt)}</span>
                    <img src="../images/date.png" alt="date" width={14} />
                  </label>
                </div>
                <div className="flex gap-2 items-start">
                  <img
                    src="../images/pen.png"
                    alt="pen"
                    className="flex w-[19px] h-[19px]"
                  />
                  <p className="text-sm text-gray-600 leading-6">
                    {item.description === ""
                      ? "No Description"
                      : item.description}
                  </p>
                </div>
                <div className="flex gap-2 items-start mt-2 relative">
                  <div className="flex gap-2 items-center">
                    <button onClick={() => handleVisibleModal(index)}>
                      <img
                        src="../images/book.png"
                        alt="pen"
                        className="flex w-[20px] h-[20px]"
                      />
                    </button>
                    {isSubmitTypeTask[index] && (
                      <div>
                        <Loader h="[20px]" w="[20px]" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.TaskType && (
                      <EachElement
                        of={item.TaskType}
                        render={(data) => {
                          const bgColor = types.find(
                            (item) => item.name === data.name
                          );
                          return (
                            <div
                              className="flex gap-2 items-center px-2 py-1 rounded text-[13px]"
                              style={{
                                backgroundColor: `${
                                  bgColor ? bgColor.color : ""
                                }`,
                              }}
                            >
                              <span>{data.name}</span>

                              <button
                                onClick={() => deleteTaskType(index, data.id)}
                              >
                                <img
                                  src="../images/close.png"
                                  alt="close"
                                  width={9}
                                />
                              </button>
                            </div>
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`absolute trans-300 flex flex-col gap-2 z-10 p-2 rounded bg-white border border-gray-400 ${
                  isModal[index] ? "scale-100" : "scale-0"
                }`}
              >
                <EachElement
                  of={types}
                  render={(type, typeIndex) => {
                    const isSelected =
                      selectedTypes[item.id || ""]?.includes(type.name) ||
                      (item.TaskType &&
                        item.TaskType.some(
                          (taskType) => taskType.name === type.name
                        ));

                    const isDisabled = isSelected;

                    return (
                      <button
                        key={typeIndex}
                        onClick={() =>
                          handleTypeClick(index, type.name, item.id || "")
                        }
                        className="text-left px-3 py-1 w-48 rounded text-[13px]"
                        style={{
                          backgroundColor: `${type.color}`,
                          borderColor: isSelected ? "#000" : "",
                          borderWidth: isSelected ? "2px" : "0px",
                        }}
                        disabled={isDisabled}
                      >
                        {type.name}
                      </button>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

export default RenderItem;
