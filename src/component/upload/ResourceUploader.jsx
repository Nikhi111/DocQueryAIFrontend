import {
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Upload,
  FileText,
  X,
} from "lucide-react";

import {
  uploadToCloudinary,
} from "../../utils/uploadToCloudinary";

import {
  uploadDocument,
} from "../../api/documentService";

const ResourceUploader = ({
  selectedChat,
  onUploadSuccess,
}) => {

  /*
  ========================
  STATE
  ========================
  */

  const [dragging, setDragging] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const inputRef = useRef();

  /*
  ========================
  VALIDATE FILE
  ========================
  */

  const processFile = (file) => {

    if (
      file.type !==
      "application/pdf"
    ) {

      alert(
        "Only PDF files allowed"
      );

      return;
    }

    setSelectedFile(file);
  };

  /*
  ========================
  DROP
  ========================
  */

  const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    const file =
      e.dataTransfer.files[0];

    if (file) {

      processFile(file);
    }
  };

  /*
  ========================
  UPLOAD
  ========================
  */

  const handleUpload =
    async () => {

      if (!selectedFile) return;

      try {

        setUploading(true);

        /*
        ========================
        CLOUDINARY UPLOAD
        ========================
        */

        const cloudinaryUrl =
          await uploadToCloudinary(
            selectedFile
          );

        /*
        ========================
        BACKEND SAVE
        ========================
        */

        await uploadDocument(
          selectedChat.id,
          {
            fileName:
              selectedFile.name,

            filePath:
              cloudinaryUrl,
          }
        );

        /*
        ========================
        REFRESH
        ========================
        */

        onUploadSuccess?.();

        /*
        ========================
        RESET
        ========================
        */

        setSelectedFile(null);

      } catch (error) {

        console.log(error);

      } finally {

        setUploading(false);
      }
    };

  return (
    <div className="w-full">

      {/* DROP ZONE */}

      <motion.div

        onDragOver={(e) => {

          e.preventDefault();

          setDragging(true);
        }}

        onDragLeave={() =>
          setDragging(false)
        }

        onDrop={handleDrop}

        onClick={() =>
          inputRef.current.click()
        }

        animate={{
          borderColor: dragging
            ? "#06b6d4"
            : "rgba(6,182,212,0.1)",
        }}

        className="cursor-pointer rounded-2xl border-2 border-dashed bg-slate-900/40 p-8 text-center backdrop-blur-xl transition-all"
      >

        <input
          type="file"
          accept=".pdf"
          hidden
          ref={inputRef}
          onChange={(e) =>
            processFile(
              e.target.files[0]
            )
          }
        />

        <motion.div
          animate={{
            y: dragging
              ? -5
              : 0,
          }}
        >

          <Upload
            size={42}
            className="mx-auto mb-4 text-cyan-400"
          />

          <h3 className="mb-2 text-lg font-semibold">

            Drag & Drop PDF

          </h3>

          <p className="text-sm text-gray-400">

            or click to browse

          </p>

        </motion.div>

      </motion.div>

      {/* FILE PREVIEW */}

      <AnimatePresence>

        {selectedFile && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            className="mt-4 rounded-xl border border-cyan-500/10 bg-slate-900/50 p-4"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <FileText
                  className="text-cyan-400"
                  size={22}
                />

                <div>

                  <div className="font-medium">

                    {
                      selectedFile.name
                    }

                  </div>

                  <div className="text-sm text-gray-400">

                    {(
                      selectedFile.size /
                      1024 /
                      1024
                    ).toFixed(2)}
                    MB

                  </div>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedFile(
                    null
                  )
                }
              >

                <X size={18} />

              </button>

            </div>

            {/* UPLOAD BUTTON */}

            <motion.button

              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              onClick={handleUpload}

              disabled={uploading}

              className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-3 font-semibold disabled:opacity-50"
            >

              {uploading
                ? "Uploading..."
                : "Upload Resource"}

            </motion.button>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default ResourceUploader;