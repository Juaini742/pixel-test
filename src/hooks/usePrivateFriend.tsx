import { useEffect, useState } from "react";
import { PrivateFriend } from "../interfaces";
import { getPrivateFriend } from "../utils";

export const usePrivateFriend = () => {
  const [privateFriend, setPrivateFriend] = useState<PrivateFriend[]>([]);

  useEffect(() => {
    const response = async () => {
      const data = await getPrivateFriend();

      setPrivateFriend(data);
    };

    return () => {
      response();
    };
  }, []);

  return { privateFriend };
};
