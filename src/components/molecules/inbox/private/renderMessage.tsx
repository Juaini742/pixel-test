import React, { useState } from "react";
import { MessageUser } from "../../../../interfaces";
import RightChat from "./rightChat";
import LeftChat from "./leftChat";
import { EachElement } from "../../../atoms/EachElement";
import { deletePrivateMessage } from "../../../../utils";
import { usePopVisible } from "../../../../hooks/usePopVisible";

interface Props {
  messages: MessageUser[] | undefined;
  userId: string | undefined;
  setVisibleMessage: React.Dispatch<React.SetStateAction<MessageUser | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  fetchMessages: () => void;
}

export const RenderMessage = ({
  messages,
  userId,
  setVisibleMessage,
  setMessage,
  fetchMessages,
}: Props) => {
  let lastDate: string | null = null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { resetPopVisible } = usePopVisible();
  const handleReplay = (id: string | undefined) => {
    let replayData: MessageUser | null = null;
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
    let editData: MessageUser | null = null;
    if (id) {
      const foundMessage = messages?.find((item) => item.id === id) || null;
      if (foundMessage) {
        editData = { ...foundMessage, type: "edit" };
      }
    }
    setVisibleMessage(editData);
    resetPopVisible();
  };

  const handleShare = (id: string | undefined) => {
    console.log("Share", id);
  };

  const handleDelete = async (id: string | undefined) => {
    setIsLoading(true);
    if (!id) return;
    await deletePrivateMessage(id);
    await fetchMessages();
    resetPopVisible();
    setIsLoading(false);
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

  return (
    <EachElement
      of={messages || []}
      render={(message: MessageUser, index) => {
        const currentDate = formatDate(message.createdAt);

        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <React.Fragment key={index}>
            {showDate && (
              <div className="w-full flex gap-6 items-center">
                <span className="border border-gray-400 w-full rounded-full" />
                <span className="w-[410px] text-center">{currentDate}</span>
                <span className="border border-gray-400 w-full rounded-full" />
              </div>
            )}
            {message.userId === userId ? (
              <RightChat
                key={index}
                message={message}
                handleEdit={handleEdit}
                handleShare={handleShare}
                handleReplay={handleReplay}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            ) : (
              <LeftChat
                message={message}
                handleShare={handleShare}
                handleReplay={handleReplay}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            )}
          </React.Fragment>
        );
      }}
    />
  );
};
