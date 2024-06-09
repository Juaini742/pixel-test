import { Link, useParams } from "react-router-dom";
import { MessageGroup } from "../../../../interfaces";
import { useGroupChats } from "../../../../hooks/useGroupChats";
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { editChatGroup, getGroupChats, postChatGroup } from "../../../../utils";
import { RenderMessage } from "./renderMessage";
import { usePopVisible } from "../../../../hooks/usePopVisible";
import Loader from "../../../atoms/loading";
import { truncateMessage } from "../../../../utils/truncateMessage";

function ChatBox() {
  const { id } = useParams();
  const { userId } = useUser();
  const ref = useRef<HTMLDivElement>(null);
  const { resetPopVisible } = usePopVisible();
  const [message, setMessage] = useState<string>("");
  const { groupChats, setGroupChats } = useGroupChats();
  const getData = groupChats.find((item) => item.id === id);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [visibleMessage, setVisibleMessage] = useState<MessageGroup | null>(
    null
  );

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
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      id: id ?? undefined,
      userId: userId ?? undefined,
      message,
      createdAt: new Date().toISOString(),
      type: "sent",
      messageId: null,
    };

    await postChatGroup(data);
    await refreshGroupChats();
    setMessage("");
    setVisibleMessage(null);
    setIsSubmitting(false);
  };

  const handleReplayMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      id: id ?? undefined,
      userId: userId ?? undefined,
      message,
      createdAt: new Date().toISOString(),
      type: "replay",
      messageId: visibleMessage?.id,
    };

    await postChatGroup(data);
    await refreshGroupChats();
    setMessage("");
    setVisibleMessage(null);
    setIsSubmitting(false);
  };

  const handleEditMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const id = visibleMessage?.id;
    const data = { message };
    await editChatGroup(data, id);
    await refreshGroupChats();
    setMessage("");
    resetPopVisible();
    setVisibleMessage(null);
    setIsSubmitting(false);
  };

  const refreshGroupChats = async () => {
    const updateGroupChats = await getGroupChats();
    setGroupChats(updateGroupChats);
  };

  const arrangeByTime = (getData: MessageGroup[] | undefined) => {
    if (!getData) return [];

    const allMessages = getData.flatMap((chat) => chat);

    return allMessages.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortedMessages = arrangeByTime(getData?.MessageGroup);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  return (
    <div className="px-5 h-full relative">
      <div className="h-28 border-b flex gap-5 items-center sticky top-0 z-20 bg-white">
        <Link to="/inbox">
          <img src="../images/back-black.png" alt="back" width={30} />
        </Link>
        <div className="flex-1">
          <h2 className="text-primary-1 text-[22px] font-semibold ">
            {getData?.title}
          </h2>
          <p>{getData?.GroupParticipant.length} Participants</p>
        </div>
        <Link to="/inbox">
          <img src="../images/close.png" alt="back" width={25} />
        </Link>
      </div>
      <div className="w-full overflow-x-hidden flex flex-col gap-5 mt-3 h-full overflow-y-scroll max-h-[500px]">
        <RenderMessage
          messages={sortedMessages}
          userId={userId}
          getData={getData}
          setVisibleMessage={setVisibleMessage}
          setMessage={setMessage}
        />
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
        className="sticky bg-white z-20 bottom-0 pb-5 pt-2 left-0 right-0 w-full"
      >
        <div className="flex w-full  gap-4 items-end">
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
                      : visibleMessage.User?.username}
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
          <button disabled={isSubmitting} className="btn-primary px-3 h-[36px]">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBox;
