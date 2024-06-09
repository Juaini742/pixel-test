import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
  activeComponent: string | null;
}

function Template({ children, setActiveComponent, activeComponent }: Props) {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showThunderButton, setShowThunderButton] = useState<boolean>(true);

  const handleShowButtons = () => {
    setShowButtons((prev) => !prev);
  };

  const handleShowTask = () => {
    setActiveComponent("task");
    setShowButtons(true);
    setShowThunderButton(false);
  };

  const handleShowInbox = () => {
    setActiveComponent("inbox");
    setShowButtons(true);
    setShowThunderButton(false);
  };

  const getButtonsOrder = () => {
    if (activeComponent === "inbox") {
      return [
        renderButton(
          "task",
          handleShowTask,
          "../images/hover-read.png",
          "Task",
          "bg-white",
          "/task"
        ),
        renderButton(
          "inbox",
          handleShowInbox,
          "../images/chat.png",
          "Inbox",
          "bg-indicator-2",
          "/inbox"
        ),
      ];
    } else if (activeComponent === "task") {
      return [
        renderButton(
          "inbox",
          handleShowInbox,
          "../images/hover-chat.png",
          "Inbox",
          "bg-white",
          "/inbox"
        ),
        renderButton(
          "task",
          handleShowTask,
          "../images/read.png",
          "Task",
          "bg-indicator-4",
          "/task"
        ),
      ];
    } else {
      return [
        renderButton(
          "task",
          handleShowTask,
          "../images/hover-read.png",
          "Task",
          "bg-white",
          "/task"
        ),
        renderButton(
          "inbox",
          handleShowInbox,
          "../images/hover-chat.png",
          "Inbox",
          "bg-white",
          "/inbox"
        ),
      ];
    }
  };

  const renderButton = (
    type: string,
    onClickHandler: () => void,
    imgSrc: string,
    label: string,
    bgColor: string,
    path: string
  ) => (
    <motion.button
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: type === "task" ? 90 : 70 }}
      transition={{ duration: 0.5, delay: type === "task" ? 0 : 0.1 }}
      key={type}
      className="w-16 relative"
      onClick={onClickHandler}
    >
      <Link to={path} className="absolute top-0 w-full left-0 z-10">
        <span
          className={`text-white absolute -top-6 left-0 right-0 ${
            activeComponent === type ? "font-semibold" : ""
          }`}
        >
          {label}
        </span>
        <img
          src={imgSrc}
          alt="img"
          className={`p-3 ${bgColor} rounded-full w-16 overflow-hidden`}
        />
      </Link>
      {activeComponent === type && (
        <div
          className="absolute rounded-full w-16 h-16 top-0 right-3"
          style={{
            backgroundColor: "rgba(241,236,255, 0.2)",
          }}
        />
      )}
    </motion.button>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[200px] h-full"></div>
      <div className="flex-1 relative">
        <div className="w-full">
          <label
            htmlFor="search"
            className="flex items-center py-2 px-3 bg-primary-3 w-full gap-3"
          >
            <span>
              <img src="../images/search.png" alt="search" />
            </span>
            <input
              type="text"
              id="search"
              className="w-full bg-transparent outline-none text-white test-lg"
            />
          </label>
        </div>
        <div className="h-full w-full  flex flex-col justify-end items-end pb-20 pr-10">
          <div className="w-[732px] max-w-[732px] h-[737px] overflow-hidden mt-3 mb-5 rounded">
            {children}
          </div>
          <div className="flex items-start gap-4 h-24 mt-4">
            <AnimatePresence>
              {showButtons && getButtonsOrder()}
            </AnimatePresence>
            {showThunderButton && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key="thunder"
                onClick={handleShowButtons}
                className="w-16"
              >
                <img
                  src="../images/thunder.png"
                  alt="img"
                  className="p-3 bg-primary-1 rounded-full w-16 overflow-hidden"
                />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
