import { useEffect, useState } from "react";
import Loader from "../../atoms/loading";
import ChatItem from "../../molecules/inbox/group/chatItem";

function InboxMainComponent() {
  const [loadVisible, setLoadVisible] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadVisible(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-white h-full w-full flex flex-col px-5 overflow-hidden">
      <label
        htmlFor="task-search"
        className="flex mt-5 items-center py-1 px-16 border-2 rounded border-primary-3 w-full gap-3"
      >
        <input
          type="text"
          id="task-search"
          className="w-full bg-transparent outline-none text-black test-lg"
          placeholder="Search"
        />
        <span>
          <img src="../images/search-black.png" alt="task-search" width={20} />
        </span>
      </label>
      <div className="flex-1 w-full h-full">
        {loadVisible && (
          <div className="flex justify-center items-center h-full">
            <Loader w={16} h={16} text="Loading Chats..." />
          </div>
        )}
        {!loadVisible && <ChatItem />}
      </div>
    </div>
  );
}

export default InboxMainComponent;
