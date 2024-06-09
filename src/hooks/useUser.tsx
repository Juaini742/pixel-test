import { useEffect, useState } from "react";
import { UserType } from "../interfaces";
import { getUsers } from "../utils";

export const useUser = () => {
  const [users, setUsers] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const userId = "c83b3422-e8a9-4bcf-9eba-614ca15ff779";

  return { users, userId };
};
