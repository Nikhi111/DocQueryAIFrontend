import {
  useState,
} from "react";

import {
  SendHorizonal,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

const MessageInput = ({
  onSendMessage,
}) => {

  const [message, setMessage] =
    useState("");

  /*
  ========================
  SEND MESSAGE
  ========================
  */

  const handleSend = () => {

    if (!message.trim()) return;

    onSendMessage(message);

    setMessage("");
  };

  /*
  ========================
  ENTER TO SEND
  ========================
  */

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();
    }
  };

  return (
    <div className="border-t border-cyan-500/10 bg-slate-950/70 backdrop-blur-xl p-4">

      <div className="flex items-end gap-3 rounded-2xl border border-cyan-500/10 bg-slate-900/50 p-4">

        <textarea
          rows={1}
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask something about your documents..."
          className="flex-1 resize-none bg-transparent text-white outline-none placeholder:text-gray-500"
        />

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleSend}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 p-3"
        >

          <SendHorizonal size={18} />

        </motion.button>

      </div>
    </div>
  );
};

export default MessageInput;