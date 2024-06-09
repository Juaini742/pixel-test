import { MessageUser } from "../../../../interfaces";
import { formatDate } from "../../../../utils/formatDate";
import { usePopVisible } from "../../../../hooks/usePopVisible";
import { truncateMessage } from "../../../../utils/truncateMessage";
import Loader from "../../../atoms/loading";

interface Props {
  message: MessageUser;
  handleEdit: (id: string | undefined) => void;
  handleShare: (id: string | undefined) => void;
  handleReplay: (id: string | undefined) => void;
  handleDelete: (id: string | undefined) => void;
  isLoading: boolean;
}

function RightChat({
  message,
  handleEdit,
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
    <div className="max-w-[420px] self-end flex items-end flex-col">
      <p className="text-right text-purple-800 font-semibold">You</p>
      {message.type === "replay" && (
        <div className="bg-gray-100 min-w-[200px] max-w-[400] rounded py-1 px-2 mb-1 ">
          <p className="text-[13px] leading-5">
            {truncateMessage(message.ParentMessage?.message || "", 40)}
          </p>
        </div>
      )}
      <div className="flex relative justify-end">
        <button onClick={() => handlePopVisible(message.id)} className="flex">
          <img src="../images/menu-gray.png" alt="menu" width={25} />
        </button>
        {popVisible[message.id!] && (
          <div
            className={`absolute z-10 w-24 py-1 border shadow-md rounded bg-white top-6 left-0 flex flex-col gap-2`}
          >
            <button
              onClick={() => handleEdit(message.id)}
              className="border-b text-primary-1 pl-2 text-left"
            >
              Edit
            </button>
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
        <div className="p-2 bg-chat-2 rounded-md">
          <p className="text-sm max-w-[335px]">{message?.message}</p>
          <span className="text-[11px]">{formatDate(message?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default RightChat;
