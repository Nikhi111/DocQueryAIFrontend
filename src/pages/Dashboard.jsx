import { useEffect, useState } from "react";

import Sidebar from "../component/sidebar/sidebar";
import ChatWindow from "../component/chat/ChatWindow";
import AnimatedBackground from "../component/AnimatedBackground";
import {
  getChats,
  createChat,
  getMessages,
  sendMessage,
} from "../api/chatService";


const Dashboard = () => {

  /*
  ========================
  STATE
  ========================
  */

  const [chats, setChats] = useState([]);
const [messages, setMessages] =
  useState([]);

const [messageLoading, setMessageLoading] =
  useState(false);
  const [selectedChat, setSelectedChat] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /*
  ========================
  FETCH CHATS
  ========================
  */

  const fetchMessages = async (
  chatId
) => {

  try {

   const response =
  await getMessages(chatId);
  console.log("response"+response)
  console.log("resonse data"+response.data)
setMessages(response.data);

  } catch (error) {

    console.log(error);
  }
};

useEffect(() => {

  if (selectedChat) {

    fetchMessages(
      selectedChat.id
    );
  }

}, [selectedChat]);
const handleSendMessage = async (
  text
) => {

  if (!text.trim()) return;

  try {

    setMessageLoading(true);

    /*
    ========================
    OPTIMISTIC MESSAGE
    ========================
    */

    const tempMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [
      ...prev,
      tempMessage,
    ]);

    /*
    ========================
    API CALL
    ========================
    */

    const aiResponse =
      await sendMessage(
        selectedChat.id,
        text
      );

    /*
    ========================
    ADD AI RESPONSE
    ========================
    */

    setMessages((prev) => [
      ...prev,
      aiResponse,
    ]);

  } catch (error) {

    console.log(error);

  } finally {

    setMessageLoading(false);
  }
};
  /*
  ========================
  CREATE CHAT
  ========================
  */


  const handleCreateChat = async (
    chatData
  ) => {
    try {
      const newChat = await createChat(
        chatData
      );

      setChats((prev) => [
        newChat,
        ...prev,
      ]);

      setSelectedChat(newChat);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchChats = async () => {

  try {

    setLoading(true);

    const data =
      await getChats();

    setChats(data);

    /*
    =====================
    AUTO SELECT FIRST CHAT
    =====================
    */

    if (
      data.length > 0 &&
      !selectedChat
    ) {

      setSelectedChat(
        data[0]
      );
    }

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
};

  /*
  ========================
  INITIAL LOAD
  ========================
  */

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-slate-950 text-white">

      <AnimatedBackground />

      <div className="relative z-10 flex h-screen">

        {/* Sidebar */}
        <div className="w-[20%] min-w-[300px] border-r border-cyan-500/10 backdrop-blur-xl">

          <Sidebar
            chats={chats}
            selectedChat={selectedChat}
            setSelectedChat={
              setSelectedChat
            }
            onCreateChat={
              handleCreateChat
            }
            loading={loading}
          />

        </div>

        {/* Main Workspace */}
        <div className="flex-1">

          <ChatWindow
  selectedChat={
    selectedChat
  }

  messages={messages}

  onSendMessage={
    handleSendMessage
  }

  messageLoading={
    messageLoading
  }
/>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;