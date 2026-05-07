import {
  useEffect,
  useRef,
} from "react";

import {
  motion,
} from "framer-motion";

import ChatHeader from "./ChatHeader";

import MessageInput from "./MessageInput";

const ChatWindow = ({
  selectedChat,
  messages,
  onSendMessage,
  messageLoading,
}) => {

  /*
  ========================
  AUTO SCROLL
  ========================
  */

  const bottomRef = useRef();

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  /*
  ========================
  EMPTY STATE
  ========================
  */

  if (!selectedChat) {

    return (
      <div className="flex h-full items-center justify-center text-gray-500">

        Select a chat

      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">

      {/* HEADER */}

      <ChatHeader
        selectedChat={
          selectedChat
        }
      />

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {messages.map((msg) => {

          const isUser =
            msg.role === "user";

          return (

            <motion.div
              key={msg.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={`flex
              
                ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 backdrop-blur-xl
                  
                  ${
                    isUser
                      ? "bg-cyan-500/20 border border-cyan-500/20"
                      : "bg-slate-900/60 border border-purple-500/10"
                  }
                `}
              >

                {msg.content}

              </div>

            </motion.div>
          );
        })}

        {/* AI LOADER */}

        {messageLoading && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="flex justify-start"
          >

            <div className="rounded-2xl border border-purple-500/10 bg-slate-900/60 px-5 py-4">

              <div className="flex gap-2">

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                  }}
                  className="h-2 w-2 rounded-full bg-cyan-400"
                />

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-cyan-400"
                />

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: 0.4,
                  }}
                  className="h-2 w-2 rounded-full bg-cyan-400"
                />

              </div>

            </div>

          </motion.div>
        )}

        <div ref={bottomRef} />

      </div>

      {/* INPUT */}

      <MessageInput
        onSendMessage={
          onSendMessage
        }
      />

    </div>
  );
};

export default ChatWindow;