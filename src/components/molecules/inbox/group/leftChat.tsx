import { Link } from "react-router-dom";
import { GroupParticipant, MessageGroup } from "../../../../interfaces";
import { formatDate } from "../../../../utils/formatDate";
import { usePopVisible } from "../../../../hooks/usePopVisible";
import { truncateMessage } from "../../../../utils/truncateMessage";
import Loader from "../../../atoms/loading";

interface Props {
  item: MessageGroup;
  getUsername: GroupParticipant;
  handleShare: (id: string | undefined) => void;
  handleReplay: (id: string | undefined) => void;
  handleDelete: (id: string | undefined) => void;
  color: string;
  isLoading: boolean;
}

function LeftChat({
  item,
  getUsername,
  handleShare,
  handleReplay,
  handleDelete,
  color,
  isLoading,
}: Props) {
  const { popVisible, setPopVisible } = usePopVisible();
  const handlePopVisible = (id: string | undefined) => {
    if (id) {
      setPopVisible((prev) => ({
        ...prev,
        [id]: !prev[id!],
      }));
    }
  };
  return (
    <div className="self-start max-w-[420px] flex flex-col">
      <Link
        to={`/private/${item.userId}`}
        className="text-left font-semibold"
        style={{
          color: `rgba(${color}, 1)`,
        }}
      >
        {getUsername.User.username}
      </Link>
      {item.type === "replay" && (
        <div className="bg-gray-100 min-w-[200px] max-w-[400] rounded py-1 px-2 mb-1 ">
          <p className="text-[13px] leading-5">
            {" "}
            {truncateMessage(item.ParentMessage?.message || "", 40)}
          </p>
        </div>
      )}
      <div className="flex relative">
        {popVisible[item.id!] && (
          <div
            className={`absolute z-10 w-24 py-1 border shadow-md rounded bg-white top-6 -right-14 flex flex-col gap-2`}
          >
            <button
              onClick={() => handleShare(item.id)}
              className="border-b text-primary-1 pl-2 text-left"
            >
              Share
            </button>
            <button
              onClick={() => handleReplay(item.id)}
              className="border-b text-primary-1 pl-2 text-left"
            >
              Replay
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-indicator-3 pl-2 text-left mt-1"
              >
                Delete
              </button>
              {isLoading && (
                <span>
                  <Loader w={6} h={6} />
                </span>
              )}
            </div>
          </div>
        )}
        <div
          className="p-2 min-w-[150px] max-w-[350px] rounded-md"
          style={{
            backgroundColor: `rgba(${color}, 0.3)`,
          }}
        >
          <p className="text-sm max-w-[335px]">{item.message}</p>
          <span className="text-[11px] ">{formatDate(item.createdAt)}</span>
        </div>
        <button onClick={() => handlePopVisible(item.id)} className="flex">
          <img src="../images/menu-gray.png" alt="menu" width={25} />
        </button>
      </div>
    </div>
  );
}

export default LeftChat;
