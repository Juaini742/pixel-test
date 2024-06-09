import axios from "axios";
import { DataTypes, MessageGroup, MessageUser, TaskType } from "../interfaces";

// const url_api = "http://localhost:8080/api";
const url_api = "https://pixelapi.jcraftstudio.my.id/api";

const get = async (url: string) => {
  try {
    const response = await axios.get(url);

    if (!response) {
      console.log("error");
      return;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const post = async (url: string, data: object) => {
  try {
    const response = await axios.post(url, data);

    if (!response) {
      console.log("error");
      return;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (url: string) => {
  try {
    const response = await axios.delete(url);

    if (!response) {
      console.log("error");
      return;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const edit = async (url: string, data: object) => {
  try {
    const response = await axios.put(url, data);

    if (!response) {
      console.log("error");
      return;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET
export const getUsers = async () => {
  const data = await get(`${url_api}/getOneUser`);
  return data;
};
export const getTask = async () => {
  const data = await get(`https://pixelapi.jcraftstudio.my.id/api/task`);
  return data;
};
export const getGroupChats = async () => {
  const data = await get(`${url_api}/groups`);
  return data;
};
export const getPrivateFriend = async () => {
  const data = await get(`${url_api}/relationUser`);
  return data;
};
export const getUserMessage = async (
  userId: string | undefined,
  userId2: string | undefined
) => {
  const data = await get(
    `${url_api}/privateMessage?userId=${userId}&userId2=${userId2}`
  );
  return data;
};

// POST
export const postChatGroup = async (data: MessageGroup) => {
  const response = await post(`${url_api}/groupMessage`, data);
  return response;
};
export const postChatPrivate = async (data: MessageUser) => {
  const response = await post(`${url_api}/messagePrivate`, data);
  return response;
};
export const postTask = async (data: TaskType) => {
  const response = await post(`${url_api}/addTask`, data);
  return response;
};
export const postTaskType = async (data: DataTypes) => {
  const response = await post(`${url_api}/addTaskType`, data);
  return response;
};
export const postIsDownTask = async (status: string, id: string) => {
  const data = { status };
  const response = await post(`${url_api}/isDownTask/${id}`, data);
  return response;
};

// EDIT
export const editPrivateMessage = async (
  data: object,
  id: string | undefined
) => {
  const response = await edit(`${url_api}/editPrivateMessage/${id}`, data);
  return response;
};
export const editChatGroup = async (data: object, id: string | undefined) => {
  const response = await edit(`${url_api}/editGroupMessage/${id}`, data);
  return response;
};

// DELETE
export const deletePrivateMessage = async (id: string | undefined) => {
  const response = await deleteItem(`${url_api}/deletePrivateMessage/${id}`);
  return response;
};
export const deleteMessageGroup = async (id: string | undefined) => {
  const response = await deleteItem(`${url_api}/deleteMessageGroup/${id}`);
  return response;
};
export const deleteTask = async (id: string | undefined) => {
  const response = await deleteItem(`${url_api}/deleteTask/${id}`);
  return response;
};
export const deleteIsDownTask = async (id: string | undefined) => {
  const response = await deleteItem(`${url_api}/deleteIsDownTask/${id}`);
  return response;
};
