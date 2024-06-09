import { useState } from "react";

interface Props {
  formData: {
    title: string;
    finishedAt: string;
    description: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      finishedAt: string;
      description: string;
    }>
  >;
}

function FormTask({ formData, setFormData }: Props) {
  const [visibleContent, setVisibleContent] = useState<boolean>(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(
      (prev: { title: string; finishedAt: string; description: string }) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  const handleVisibleContent = () => {
    setVisibleContent(!visibleContent);
  };

  return (
    <div className="flex-1 flex gap-3 items-start">
      <input type="checkbox" className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between relative">
          <div className="flex-1 flex gap-3">
            <label
              htmlFor="title"
              className=" bg-white pl-2 py-2 border border-gray-400 rounded"
            >
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                className="w-96 outline-none"
                placeholder="Type Task Title"
              />
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleVisibleContent()}>
              <img
                src={visibleContent ? "../images/down.png" : "../images/up.png"}
                alt="Arrow"
                width={10}
              />
            </button>
            <button>
              <img src="../images/menu-gray.png" alt="menu" />
            </button>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            visibleContent ? "max-h-44" : "max-h-0"
          }`}
          style={{ transitionProperty: "max-height" }}
        >
          <div className="flex items-center gap-2 my-3">
            <img
              src="../images/clock-black.png"
              alt="clock"
              className="flex w-6 h-6"
            />
            <label
              htmlFor="finishDate"
              className="w-54 border border-gray-400 rounded px-4 py-2 flex justify-between items-center overflow-hidden"
            >
              <input
                type="datetime-local"
                name="finishedAt"
                value={formData.finishedAt || ""}
                onChange={handleInputChange}
                className="outline-none"
                placeholder="Set Date"
              />
              {/* <img src="../images/date.png" alt="date" width={14} /> */}
            </label>
          </div>
          <div className="flex gap-2 items-start h-[400px]">
            <img
              src="../images/pen-black.png"
              alt="pen"
              className="flex w-[19px] h-[19px]"
            />
            {/* <p className="text-sm text-gray-600">No Description</p> */}
            <textarea
              rows={4}
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full outline-none"
            >
              No Description
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormTask;
