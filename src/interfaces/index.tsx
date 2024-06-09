interface Types {
  id: string;
  name: string;
  taskId: string;
}

export interface TaskType {
  id?: string | undefined;
  title: string;
  createdAt?: string | undefined;
  finishedAt: string;
  description: string;
  userId?: string | undefined;
  type?: string;
  TaskType?: Types[];
}

export interface DataTypes {
  taskId: string | undefined;
  name: string | undefined;
}

export interface MessageUser {
  id?: string;
  message: string;
  type?: string;
  createdAt: string;
  userId?: string;
  to?: string;
  messageId?: string | null;
  UserId?: {
    id: string;
    username: string;
  };
  To?: {
    id: string;
    username: string;
  };
  ParentMessage?: ParentMessage;
}
interface ParentMessage {
  id: string;
  message: string;
  User: {
    id: string;
    username: string;
  };
}
export interface MessageGroup {
  id?: string | undefined;
  userId: string | undefined;
  message: string;
  createdAt: string;
  type?: string;
  messageId: string | null | undefined;
  User?: UserType;
  groupId?: string;
  ParentMessage?: ParentMessage | null;
}

export interface UserType {
  id?: string;
  username: string;
}

export interface GroupParticipant {
  User: UserType;
}

export interface ChatGroup {
  type: "group";
  id: string;
  title: string;
  GroupParticipant: GroupParticipant[];
  MessageGroup: MessageGroup[];
}

export interface ChatGroups extends Array<ChatGroup> {}

export interface PrivateChat {
  id: string;
  username: string;
  sentMessages: MessageUser[];
  receivedMessages: MessageUser[];
}

export interface PrivateFriend {
  id: string;
  userId: string;
  friend: string;
  User: UserType;
  Friend: UserType;
}
