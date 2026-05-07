import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Upload,
} from "lucide-react";

import ResourceUploader
  from "../upload/ResourceUploader";

const ChatHeader = ({
  selectedChat,
}) => {

  const [showUploader,
    setShowUploader] =
      useState(false);

  return (
    <div className="sticky top-0 z-20 border-b border-cyan-500/10 bg-slate-950/60 px-6 py-4 backdrop-blur-xl">

      {/* TOP BAR */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">

            {selectedChat?.name}

          </h2>

          <p className="text-sm text-gray-400">

            {
              selectedChat?.description
            }

          </p>

        </div>

        {/* BUTTON */}

        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={() =>
            setShowUploader(
              !showUploader
            )
          }

          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 font-semibold shadow-lg shadow-cyan-500/20"
        >

          <Upload size={18} />

          Add Resource

        </motion.button>

      </div>

      {/* UPLOADER */}

      <AnimatePresence>

        {showUploader && (

          <motion.div

            initial={{
              opacity: 0,
              height: 0,
            }}

            animate={{
              opacity: 1,
              height: "auto",
            }}

            exit={{
              opacity: 0,
              height: 0,
            }}

            className="mt-4 overflow-hidden"
          >

            <ResourceUploader
              selectedChat={
                selectedChat
              }
            />

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default ChatHeader;