import { useEffect, useState } from "react";
import { MessageUser } from "../interfaces";
import { getUserMessage } from "../utils";

interface Props {
  userId: string | undefined;
  userId2: string | undefined;
}

export const usePrivateChats = ({ userId, userId2 }: Props) => {
  const [privateChat, setPrivateChat] = useState<MessageUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getUserMessage(userId, userId2);
      setPrivateChat(data);
      setIsLoading(false);
    };

    fetchMessages();
  }, [userId, userId2]);

  return { privateChat, setPrivateChat, isLoading };
};
