import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  MoreVertical,
  Send,
} from "lucide-react";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export default function ChatRoom({

  selectedUser,

  setCurrentTab,

}) {

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    showMenu,
    setShowMenu,
  ] = useState(false);

  const [
    messages,
    setMessages,
  ] = useState([]);

  const [
    onlineStatus,
    setOnlineStatus,
  ] = useState(false);

  const [
    clearedChats,
    setClearedChats,
  ] = useState({});

  const [
    chatMeta,
    setChatMeta,
  ] = useState({});

  const [
    now,
    setNow,
  ] = useState(
    Date.now()
  );

  const bottomRef =
    useRef(null);

  if (!selectedUser) {

    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white z-[9999]">

        <h1 className="text-2xl font-bold">

          Loading chat...

        </h1>

      </div>
    );

  }

  const chatId =
    [
      auth.currentUser.uid,
      selectedUser.id,
    ]
      .sort()
      .join("_");

  useEffect(() => {

    const timer =
      setInterval(
        () => {

          setNow(
            Date.now()
          );

        },

        1000
      );

    return () =>
      clearInterval(
        timer
      );

  }, []);

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          "clearedChats"
        )
      ) || {};

    setClearedChats(
      stored
    );

  }, []);

  useEffect(() => {

    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "presence",
          selectedUser.id
        ),

        (snapshot) => {

          if (
            snapshot.exists()
          ) {

            const data =
              snapshot.data();

            const isOnline =
              now -
                data.lastActive <
              7000;

            setOnlineStatus(
              isOnline
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, [
    selectedUser.id,
    now,
  ]);

  useEffect(() => {

    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "chatMeta",
          chatId
        ),

        (snapshot) => {

          if (
            snapshot.exists()
          ) {

            setChatMeta(
              snapshot.data()
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, [chatId, messages]);

  useEffect(() => {

    const q = query(
      collection(
        db,
        "chats",
        chatId,
        "messages"
      ),

      orderBy(
        "createdAt"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,

        (snapshot) => {

          const loaded =
            snapshot.docs.map(
              (docItem) => ({
                id:
                  docItem.id,

                ...docItem.data(),
              })
            );

          const clearedAt =
            clearedChats[
              chatId
            ];

          if (
            clearedAt
          ) {

            const filtered =
              loaded.filter(
                (msg) => {

                  if (
                    !msg.createdAt
                  ) {

                    return false;

                  }

                  return (
                    msg.createdAt.toMillis() >
                    clearedAt
                  );

                }
              );

            setMessages(
              filtered
            );

          } else {

            setMessages(
              loaded
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, [
    chatId,
    clearedChats,
  ]);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior:
        "smooth",
    });

  }, [messages]);

  useEffect(() => {

    const markAsSeen =
      async () => {

        try {

          await setDoc(
            doc(
              db,
              "chatMeta",
              chatId
            ),

            {
              unreadCounts: {

                [auth.currentUser.uid]:
                  0,

              },

            },

            {
              merge: true,
            }
          );

        } catch (error) {

          console.log(
            error
          );

        }

      };

    markAsSeen();

  }, [chatId]);

  const clearChat =
    async () => {

      const updated =
        {
          ...clearedChats,

          [chatId]:
            Date.now(),
        };

      localStorage.setItem(
        "clearedChats",

        JSON.stringify(
          updated
        )
      );

      setClearedChats(
        updated
      );

      setMessages([]);

      setShowMenu(
        false
      );

    };

  const sendMessage =
    async () => {

      if (
        !message.trim()
      ) {

        return;

      }

      try {

        await addDoc(
          collection(
            db,
            "chats",
            chatId,
            "messages"
          ),
          {
            text:
              message,

            senderId:
              auth.currentUser.uid,

            createdAt:
              serverTimestamp(),
          }
        );

        const currentUnread =
          chatMeta
            ?.unreadCounts?.[
            selectedUser.id
          ] || 0;

        await setDoc(
          doc(
            db,
            "chatMeta",
            chatId
          ),

          {
            users: [
              auth.currentUser.uid,
              selectedUser.id,
            ],

            lastMessage:
              message,

            updatedAt:
              serverTimestamp(),

            unreadCounts: {

              [selectedUser.id]:
                currentUnread + 1,

              [auth.currentUser.uid]:
                0,

            },

          },

          {
            merge: true,
          }
        );

        setMessage("");

      } catch (error) {

        console.log(
          error
        );

      }

    };

  return (

    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] top-[-120px] left-[-100px]"></div>

      <div className="absolute w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] bottom-[-120px] right-[-100px]"></div>

      <div className="relative z-20 flex items-center justify-between px-5 pt-10 pb-4 border-b border-white/10 bg-black/70 backdrop-blur-2xl">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setCurrentTab(
                "chats"
              )
            }
            className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"
          >

            <ArrowLeft size={22} />

          </button>

          <div className="relative">

            <img
              src={
                selectedUser.profilePic
              }
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400/30"
            />

            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black ${
                onlineStatus
                  ? "bg-green-400"
                  : "bg-zinc-500"
              }`}
            ></div>

          </div>

          <div>

            <h1 className="text-xl font-black text-white">

              {
                selectedUser.username
              }

            </h1>

            <p className="text-cyan-300 text-sm">

              {
                onlineStatus
                  ? "Online ✨"
                  : "Offline"
              }

            </p>

          </div>

        </div>

        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(
                !showMenu
              )
            }
            className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:scale-105 transition-all"
          >

            <MoreVertical size={20} />

          </button>

          <AnimatePresence>

            {showMenu && (

              <>

                <div
                  onClick={() =>
                    setShowMenu(
                      false
                    )
                  }
                  className="fixed inset-0 z-40"
                ></div>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="absolute top-14 right-0 z-50 w-48 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.12)]"
                >

                  <button
                    onClick={
                      clearChat
                    }
                    className="w-full text-left px-5 py-4 hover:bg-white/10 transition-all"
                  >

                    Clear Chat

                  </button>

                </motion.div>

              </>

            )}

          </AnimatePresence>

        </div>

      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-4">

        {messages.map(
          (msg) => {

            const mine =
              msg.senderId ===
              auth.currentUser.uid;

            return (

              <div
                key={msg.id}
                className={`flex ${
                  mine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className={`max-w-[78%] px-5 py-3 rounded-[26px] shadow-xl ${
                    mine
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 rounded-br-md"
                      : "bg-white/10 border border-white/10 rounded-bl-md backdrop-blur-xl"
                  }`}
                >

                  <p className="text-[15px] leading-relaxed break-words">

                    {msg.text}

                  </p>

                </motion.div>

              </div>

            );

          }
        )}

        <div ref={bottomRef}></div>

      </div>

      <div className="relative z-20 px-4 py-3 bg-black/60 backdrop-blur-2xl border-t border-white/10">

        <div className="bg-white/5 border border-white/10 rounded-[30px] px-3 py-3 flex items-center gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key ===
                "Enter"
              ) {

                sendMessage();

              }

            }}
            placeholder="Type your vibe..."
            className="flex-1 bg-transparent px-3 text-white outline-none placeholder:text-zinc-500"
          />

          <button
            onClick={
              sendMessage
            }
            className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.25)]"
          >

            <Send size={20} />

          </button>

        </div>

      </div>

    </div>

  );

}