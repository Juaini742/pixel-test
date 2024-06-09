import { usePopVisible } from "../../../../hooks/usePopVisible";
import { MessageUser } from "../../../../interfaces";
import { formatDate } from "../../../../utils/formatDate";
import { truncateMessage } from "../../../../utils/truncateMessage";
import Loader from "../../../atoms/loading";

interface Props {
  message: MessageUser;
  handleShare: (id: string | undefined) => void;
  handleReplay: (id: string | undefined) => void;
  handleDelete: (id: string | undefined) => void;
  isLoading: boolean;
}

function LeftChat({
  message,
  handleShare,
  handleReplay,
  handleDelete,
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
    <div key={message?.id} className="max-w-[420px] self-start relative">
      <p className="text-left text-primary-1 font-semibold">
        {message.UserId?.username}
      </p>
      {message.type === "replay" && (
        <div className="bg-gray-100 min-w-[200px] max-w-[400] rounded py-1 px-2 mb-1 ">
          <p className="text-[13px] leading-5">
            {truncateMessage(message.ParentMessage?.message || "", 40)}
          </p>
        </div>
      )}
      <div className="flex relative">
        {popVisible[message.id!] && (
          <div
            className={`absolute z-10 w-24 py-1 border shadow-md rounded bg-white top-5 -right-16 flex flex-col gap-2`}
          >
            <button
              onClick={() => handleShare(message.id)}
              className="border-b text-primary-1 pl-2 text-left"
            >
              Share
            </button>
            <button
              onClick={() => handleReplay(message.id)}
              className="border-b text-primary-1 pl-2 text-left"
            >
              Replay
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(message.id)}
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
        <div className="p-2 bg-gray-100 rounded-md">
          <p className="text-sm max-w-[335px]">{message?.message}</p>
          <span className="text-[11px]">{formatDate(message?.createdAt)}</span>
        </div>
        <button onClick={() => handlePopVisible(message.id)} className="flex">
          <img src="../images/menu-gray.png" alt="menu" width={25} />
        </button>
      </div>
    </div>
  );
}

export default LeftChat;
