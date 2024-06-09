import { createContext, useContext, useEffect, useState } from "react";
import { ChatGroup } from "../interfaces";
import { getGroupChats } from "../utils";

const GroupChatContext = createContext<{
  groupChats: ChatGroup[];
  setGroupChats: React.Dispatch<React.SetStateAction<ChatGroup[]>>;
}>({ groupChats: [], setGroupChats: () => {} });

export const GroupChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [groupChats, setGroupChats] = useState<ChatGroup[]>([]);

  useEffect(() => {
    const response = async () => {
      const data = await getGroupChats();

      setGroupChats(data);
    };

    return () => {
      response();
    };
  }, []);

  return (
    <GroupChatContext.Provider value={{ groupChats, setGroupChats }}>
      {children}
    </GroupChatContext.Provider>
  );
};

export const useGroupChats = () => {
  return useContext(GroupChatContext);
};
