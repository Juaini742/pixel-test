import React, { useEffect, useState } from "react";
import { ChatGroup, MessageGroup } from "../../../../interfaces";
import RightChat from "./rightChat";
import LeftChat from "./leftChat";
import { EachElement } from "../../../atoms/EachElement";
import { deleteMessageGroup, getGroupChats } from "../../../../utils";
import { useGroupChats } from "../../../../hooks/useGroupChats";
import { usePopVisible } from "../../../../hooks/usePopVisible";

interface Props {
  messages: MessageGroup[] | undefined;
  userId: string | null | undefined;
  getData: ChatGroup | undefined;
  setVisibleMessage: (message: MessageGroup | null) => void;
  setMessage: (message: string) => void;
}
const colors = [
  "255,204,104",
  "48,233,187",
  "74,212,122",
  "248,134,140",
  "71,143,199",
];

export const RenderMessage = ({
  messages,
  userId,
  getData,
  setVisibleMessage,
  setMessage,
}: Props) => {
  const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setGroupChats } = useGroupChats();
  const { resetPopVisible } = usePopVisible();
  let lastDate: string | null = null;

  const handleShare = (id: string | undefined) => {
    console.log("Share", id);
  };

  const handleReplay = (id: string | undefined) => {
    let replayData: MessageGroup | null = null;
    if (id) {
      const foundMessage = messages?.find((item) => item.id === id);
      if (foundMessage) {
        replayData = { ...foundMessage, type: "replay" };
      }
    }
    setVisibleMessage(replayData);
    setMessage("");
    resetPopVisible();
  };

  const handleEdit = async (id: string | undefined) => {
    let editData: MessageGroup | null = null;
    if (id) {
      const foundMessage = messages?.find((item) => item.id === id) || null;
      if (foundMessage) {
        editData = { ...foundMessage, type: "edit" };
      }
    }
    setVisibleMessage(editData);
    resetPopVisible();
  };

  const handleDelete = async (id: string | undefined) => {
    setIsLoading(true);
    if (!id) return;
    await deleteMessageGroup(id);
    await refreshGroupChats();
    resetPopVisible();
    setIsLoading(false);
  };

  const refreshGroupChats = async () => {
    const updateGroupChats = await getGroupChats();
    setGroupChats(updateGroupChats);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const newColorMap: { [key: string]: string } = { ...colorMap };
    let colorIndex = Object.keys(colorMap).length;

    messages?.filter(Boolean).forEach((message) => {
      if (message.userId && !newColorMap[message.userId]) {
        newColorMap[message.userId] = colors[colorIndex % colors.length];
        colorIndex++;
      }
    });

    setColorMap(newColorMap);
  }, [messages]);

  console.log(userId);

  return (
    <EachElement
      of={messages || []}
      render={(item, index) => {
        const currentDate = formatDate(item.createdAt);

        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        const getUsername = getData?.GroupParticipant.find(
          (member) => member.User.id === item.userId
        ) || { User: { id: "", username: "" } };

        return (
          <React.Fragment key={index}>
            {showDate && (
              <div className="w-full flex gap-6 items-center">
                <span className="border border-gray-400 w-full rounded-full" />
                <span className="w-[410px] text-center">{currentDate}</span>
                <span className="border border-gray-400 w-full rounded-full" />
              </div>
            )}
            {userId === undefined ? (
              <div className="py-6 bg-gray-200 w-[400px] rounded animate-pulse" />
            ) : item.userId === userId ? (
              <RightChat
                key={index}
                item={item}
                handleEdit={handleEdit}
                handleShare={handleShare}
                handleReplay={handleReplay}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            ) : (
              <LeftChat
                key={index}
                item={item}
                getUsername={getUsername}
                handleShare={handleShare}
                handleReplay={handleReplay}
                handleDelete={handleDelete}
                color={colorMap[item.userId]}
                isLoading={isLoading}
              />
            )}
          </React.Fragment>
        );
      }}
    />
  );
};
