import { Link } from "react-router-dom";
import { EachElement } from "../../../atoms/EachElement";
import { ChatGroup } from "../../../../interfaces";
import { useGroupChats } from "../../../../hooks/useGroupChats";
import { useUser } from "../../../../hooks/useUser";
import { formatDateCompleteVersion } from "../../../../utils/formatDate";
import { truncateMessage } from "../../../../utils/truncateMessage";

function ChatItem() {
  const { groupChats } = useGroupChats();
  const { userId } = useUser();

  return (
    <div className="w-full mt-4 overflow-hidden">
      <div className="flex flex-col gap-8 h-[650px] overflow-y-scroll">
        {groupChats.length === 0 ? (
          <div className="">
            <span>loading...</span>
          </div>
        ) : (
          <EachElement
            of={groupChats}
            render={(item: ChatGroup) => {
              const sortedMessages = [...item.MessageGroup].sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );
              const latestMessage = sortedMessages[0];

              const sender = item.GroupParticipant.find(
                (member) => member.User.id === latestMessage.userId
              );

              return (
                <Link key={item.id} to={`/inbox/${item.id}`}>
                  <div className="flex gap-3 pb-[22px] border-b-[2px] border-gray-300">
                    <div className="relative w-14 flex justify-end">
                      <div className="rounded-full bg-primary-1 p-1 w-10 h-10 absolute z-10">
                        <img
                          src="../images/user.png"
                          alt="user"
                          className="w-8"
                        />
                      </div>
                      <div className="rounded-full bg-primary-3 p-1 absolute top-0 right-5">
                        <img
                          src="../images/user.png"
                          alt="user"
                          className="w-8"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-start gap-2">
                        <h2 className="text-primary-1 text-[22px] font-semibold w-[460px]">
                          {item.title}
                        </h2>
                        <p className="text-primary-2 w-[140px]">
                          {formatDateCompleteVersion(latestMessage.createdAt)}
                        </p>
                      </div>
                      <p className="text-[14px] font-semibold">
                        {sender?.User.id === userId
                          ? "You"
                          : sender?.User.username}{" "}
                        :
                      </p>
                      <p className="text-primary-2 w-[590px]">
                        {truncateMessage(latestMessage.message, 20)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ChatItem;
