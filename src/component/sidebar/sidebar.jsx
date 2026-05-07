import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { getDocuments } from "../../api/documentService";

const Sidebar = ({
  chats,
  selectedChat,
  setSelectedChat,
  onCreateChat,
  loading,
}) => {
  /*
  ========================
  FORM STATE
  ========================
  */

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [expandedChats, setExpandedChats] = useState({});
  const [documents, setDocuments] = useState({});
  const [loadingDocs, setLoadingDocs] = useState({});

  /*
  ========================
  TOGGLE CHAT
  ========================
  */

  const toggleChat = (chatId) => {
    setExpandedChats((prev) => ({
      ...prev,
      [chatId]: !prev[chatId],
    }));
  };

  /*
  ========================
  CREATE CHAT
  ========================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreateChat(formData);

    setFormData({
      name: "",
      description: "",
    });

    setShowForm(false);
  };

  /*
  ========================
  FETCH DOCUMENTS
  ========================
  */

  const fetchDocuments = async (chatId) => {
    setLoadingDocs((prev) => ({
      ...prev,
      [chatId]: true,
    }));

    try {
      const response = await getDocuments(chatId);
      console.log("Documents fetched:", response);

      // Response is already an array, not response.data
      const docArray = Array.isArray(response) ? response : [];

      setDocuments((prev) => ({
        ...prev,
        [chatId]: docArray,
      }));
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments((prev) => ({
        ...prev,
        [chatId]: [],
      }));
    } finally {
      setLoadingDocs((prev) => ({
        ...prev,
        [chatId]: false,
      }));
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          DocQuery AI
        </h1>
      </div>

      {/* New Chat Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowForm(!showForm)}
        className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-3 font-semibold shadow-lg shadow-cyan-500/20 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-shadow"
      >
        <Plus size={18} />
        New Chat
      </motion.button>

      {/* CREATE CHAT FORM */}
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="mb-4 overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-900/50 p-4"
          >
            <input
              type="text"
              placeholder="Chat Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="mb-3 w-full rounded-lg border border-cyan-500/20 bg-slate-800/50 px-4 py-3 outline-none focus:border-cyan-500/50 focus:bg-slate-800 transition-colors text-white placeholder-gray-500"
              required
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="mb-3 w-full rounded-lg border border-cyan-500/20 bg-slate-800/50 px-4 py-3 outline-none focus:border-cyan-500/50 focus:bg-slate-800 transition-colors text-white placeholder-gray-500 resize-none"
              rows="3"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-cyan-500 py-2 font-semibold text-white hover:bg-cyan-600 transition-colors"
              >
                Create
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-lg bg-slate-700 py-2 text-white hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {loading ? (
          <div className="text-center text-gray-400 py-8">
            Loading chats...
          </div>
        ) : chats && chats.length > 0 ? (
          chats.map((chat) => {
            const isSelected = selectedChat?.id === chat.id;
            const isExpanded = expandedChats[chat.id];
            const chatDocuments = documents[chat.id] || [];
            const isLoadingDocs = loadingDocs[chat.id];

            return (
              <motion.div
                key={chat.id}
                layoutId={`chat-${chat.id}`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-cyan-500/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                    : "border-cyan-500/10 bg-slate-900/40 hover:border-cyan-500/20"
                }`}
              >
                {/* CHAT HEADER */}
                <div
                  className="flex items-center justify-between"
                  onClick={() => {
                    setSelectedChat(chat);
                    toggleChat(chat.id);

                    if (!documents[chat.id] && !loadingDocs[chat.id]) {
                      fetchDocuments(chat.id);
                    }
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">
                      {chat.name}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {chat.description}
                    </div>
                  </div>

                  <div className="ml-2 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown size={18} className="text-cyan-400" />
                    ) : (
                      <ChevronRight size={18} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* RESOURCES SECTION */}
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      layoutId={`content-${chat.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-4 border-t border-cyan-500/10 pt-3"
                    >
                      <div className="space-y-2">
                        {isLoadingDocs ? (
                          <div className="flex items-center justify-center py-4 text-gray-400">
                            <span className="text-sm">Loading documents...</span>
                          </div>
                        ) : chatDocuments && chatDocuments.length > 0 ? (
                          chatDocuments.map((doc) => (
                            <motion.div
                              key={doc.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => window.open(doc.filePath, "_blank")}
                              className="rounded-lg bg-slate-800/50 p-2 text-sm text-gray-300 hover:bg-slate-700/50 transition-colors truncate"
                              title={doc.fileName}
                            >
                              📄 {doc.fileName}
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 py-3 text-center">
                            No documents found
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center text-gray-400 py-8">
            No chats yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;