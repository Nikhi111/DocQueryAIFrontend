import api from "./axios";

export const greetUser = async () => {
  try {
    const response = await api.get("/user/greet");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createChat = async (chatData) => {
  try {
    const response = await api.post("/user/create", chatData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getChats = async () => {
  try {
    const response = await api.get("/user/chats");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const renameChat = async (chatId, name) => {
  try {
    const response = await api.put(`/user/${chatId}/${name}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const response = await api.post(
      `/user/chat/${chatId}/message`,
      null,
      {
        params: {
          message,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMessages = async (
  chatId,
  cursor = 0,
  limit = 20
) => {
  try {
    const response = await api.get("/user/chat/messages", {
      params: {
        chat_id: chatId,
        cursor,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};