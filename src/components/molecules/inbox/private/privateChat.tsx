import { RenderMessage } from "./renderMessage";
import { useUser } from "../../../../hooks/useUser";
import React, { useEffect, useRef, useState } from "react";
import { usePopVisible } from "../../../../hooks/usePopVisible";
import { usePrivateChats } from "../../../../hooks/usePrivateChats";
import { usePrivateFriend } from "../../../../hooks/usePrivateFriend";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import type {
  MessageUser,
  PrivateChat,
  PrivateFriend,
} from "../../../../interfaces";
import {
  editPrivateMessage,
  getUserMessage,
  postChatPrivate,
} from "../../../../utils";
import Loader from "../../../atoms/loading";
import { truncateMessage } from "../../../../utils/truncateMessage";

function PrivateChat() {
  const { id } = useParams();
  const { userId } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { resetPopVisible } = usePopVisible();
  const { privateFriend } = usePrivateFriend();
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [setUser, setSetUser] = useState<PrivateFriend | null>(null);
  const { privateChat, setPrivateChat, isLoading } = usePrivateChats({
    userId: userId,
    userId2: id,
  });
  const [visibleMessage, setVisibleMessage] = useState<MessageUser | null>(
    null
  );

  useEffect(() => {
    const getUsername = privateFriend.find((item) => item.friend === id);
    if (getUsername) {
      setSetUser(getUsername);
    }
  }, [id, privateFriend]);

  useEffect(() => {
    if (visibleMessage !== null) {
      if (visibleMessage.type === "edit") {
        setMessage(visibleMessage.message);
      } else {
        setMessage("");
      }
    } else {
      setMessage("");
    }
  }, [visibleMessage, userId]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const data = {
      message,
      createdAt: new Date().toISOString(),
      to: id ?? "",
      userId: setUser?.userId ?? "",
      type: "sent",
      messageId: null,
    };

    await postChatPrivate(data);
    await fetchMessages();
    setMessage("");
    setIsSubmitting(false);
  };

  const handleReplayMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const data = {
      message,
      createdAt: new Date().toISOString(),
      to: id ?? "",
      userId: setUser?.userId ?? "",
      type: "replay",
      messageId: visibleMessage?.id,
    };

    await postChatPrivate(data);
    await fetchMessages();
    setMessage("");
    setVisibleMessage(null);
    setIsSubmitting(false);
  };

  const handleEditMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const id = visibleMessage?.id;
    const data = { message };
    await editPrivateMessage(data, id);
    await fetchMessages();
    setMessage("");
    resetPopVisible();
    setVisibleMessage(null);
    setIsSubmitting(false);
  };

  const fetchMessages = async () => {
    const userId2 = id;
    const updateMessage = await getUserMessage(userId, userId2);
    setPrivateChat(updateMessage || []);
  };

  const handleBack = () => {
    navigate(location.state?.from?.pathname || "/inbox");
  };

  const arrangeByTime = (privateChat: MessageUser[]) => {
    if (!privateChat || privateChat.length === 0) return [];

    const allMessages = privateChat.flatMap((chat) => chat);

    return allMessages.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortedMessages = arrangeByTime(privateChat);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  return (
    <div className="bg-white px-5 h-full flex flex-col relative overflow-y-scroll">
      <div className="h-28 border-b flex gap-5 items-center sticky top-0 z-20 bg-white">
        <button onClick={handleBack}>
          <img src="../images/back-black.png" alt="back" width={30} />
        </button>
        <div className="flex-1">
          <h2 className="text-primary-1 text-[22px] font-semibold ">
            {setUser ? setUser.Friend.username : ""}
          </h2>
        </div>
        <Link to="/inbox">
          <img src="../images/close.png" alt="back" width={25} />
        </Link>
      </div>
      <div className="flex-1 flex flex-col gap-5 mt-3 h-full overflow-y-scroll max-h-[500px]">
        {isLoading && sortedMessages.length === 0 ? (
          <div className="my-10 text-center w-full">
            <Loader w="16" h="16" />
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="my-10 text-center w-full">There is no chats</div>
        ) : (
          <RenderMessage
            userId={userId}
            messages={sortedMessages}
            setVisibleMessage={setVisibleMessage}
            setMessage={setMessage}
            fetchMessages={fetchMessages}
          />
        )}
        <div ref={ref} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (visibleMessage === null) {
            handleSendMessage(e);
          } else if (visibleMessage?.type === "replay") {
            handleReplayMessage(e);
          } else {
            handleEditMessage(e);
          }
        }}
        className="sticky bg-white z-20 bottom-0 pb-5 pt-2 px-5 left-0 right-0 w-full"
      >
        <div className="flex w-full gap-2 items-end">
          <div className="flex-1">
            {visibleMessage !== null && (
              <div className="w-full bg-gray-100 border-t border-r border-l rounded-tr rounded-tl border-gray-500  py-1 px-2">
                <div className="flex justify-between">
                  <h5 className="font-semibold text-sm">
                    {visibleMessage.type === "edit" &&
                    visibleMessage.userId === userId
                      ? "Update Message"
                      : visibleMessage.type === "replay" &&
                        visibleMessage.userId === userId
                      ? "You"
                      : visibleMessage.UserId?.username}
                  </h5>
                  <button onClick={() => resetPopVisible()}>
                    <img src="../images/close.png" alt="back" width={10} />
                  </button>
                </div>
                <p className="text-sm">
                  {truncateMessage(visibleMessage.message, 39)}
                </p>
              </div>
            )}
            <label className="w-full flex py-[5px] px-1 border-2 rounded-bl rounded-br  border-primary-3">
              <input
                type="text"
                id="task-search"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full outline-none text-black test-lg"
                placeholder="Type a new message"
              />
              {isSubmitting && (
                <div className="text-sm">
                  <Loader h={6} w={6} />
                </div>
              )}
            </label>
          </div>
          <button className="btn-primary px-3 h-[33px]">Send</button>
        </div>
      </form>
    </div>
  );
}

export default PrivateChat;
