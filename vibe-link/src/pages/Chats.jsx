import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function Chats({

  setCurrentTab,

  setSelectedChatUser,

}) {

  const [
    connectedUsers,
    setConnectedUsers,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    chatMeta,
    setChatMeta,
  ] = useState({});

  const [
    presenceData,
    setPresenceData,
  ] = useState({});

  const [
    now,
    setNow,
  ] = useState(
    Date.now()
  );

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

    const fetchConnections =
      async () => {

        try {

          const connectionSnapshot =
            await getDocs(
              collection(
                db,
                "connections"
              )
            );

          const userSnapshot =
            await getDocs(
              collection(
                db,
                "users"
              )
            );

          const currentUid =
            auth.currentUser.uid;

          const connectedIds =
            [];

          connectionSnapshot.forEach(
            (docItem) => {

              const data =
                docItem.data();

              if (
                data.users.includes(
                  currentUid
                )
              ) {

                const otherUser =
                  data.users.find(
                    (id) =>
                      id !==
                      currentUid
                  );

                connectedIds.push(
                  otherUser
                );

              }

            }
          );

          const matchedUsers =
            [];

          userSnapshot.forEach(
            (docItem) => {

              if (
                connectedIds.includes(
                  docItem.id
                )
              ) {

                matchedUsers.push({
                  id:
                    docItem.id,

                  ...docItem.data(),
                });

              }

            }
          );

          setConnectedUsers(
            matchedUsers
          );

         const q = query(
  collection(
    db,
    "chatMeta"
  ),

  where(
    "users",
    "array-contains",
    auth.currentUser.uid
  ),

  orderBy(
    "updatedAt",
    "desc"
  )
);

          onSnapshot(
            q,

            (snapshot) => {

              const loadedMeta =
                {};

              snapshot.forEach(
                (docItem) => {

                  loadedMeta[
                    docItem.id
                  ] =
                    docItem.data();

                }
              );

              setChatMeta(
                loadedMeta
              );

            }
          );

          onSnapshot(
            collection(
              db,
              "presence"
            ),

            (snapshot) => {

              const loadedPresence =
                {};

              snapshot.forEach(
                (docItem) => {

                  loadedPresence[
                    docItem.id
                  ] =
                    docItem.data();

                }
              );

              setPresenceData(
                loadedPresence
              );

            }
          );

        } catch (error) {

          console.log(
            error
          );

        } finally {

          setLoading(
            false
          );

        }

      };

    fetchConnections();

  }, []);

  if (loading) {

    return (
      <div className="text-white text-center pt-40">

        <h1 className="text-3xl font-bold animate-pulse">
          Loading chats...
        </h1>

      </div>
    );

  }

  return (
    <div className="px-4 pb-24 text-white">

      <div className="max-w-sm mx-auto">

        <div className="mb-6">

          <h1 className="text-4xl font-black">
            Chats
          </h1>

          <p className="text-zinc-400 mt-2">
            Your tribe conversations.
          </p>

        </div>

        {connectedUsers.length ===
        0 ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[28px] p-4 flex items-center gap-4"
          >

            <img
              src="https://i.pravatar.cc/200"
              alt="profile"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex-1">

              <h2 className="font-bold text-lg">
                No chats yet
              </h2>

              <p className="text-zinc-400 text-sm">
                Connect with someone to start chatting.
              </p>

            </div>

          </motion.div>

        ) : (

          <div className="space-y-4">

            {connectedUsers.map(
              (user) => {

                const chatId =
                  [
                    auth.currentUser.uid,
                    user.id,
                  ]
                    .sort()
                    .join("_");

                const isOnline =
                  now -
                    (
                      presenceData[
                        user.id
                      ]?.lastActive || 0
                    ) <
                  7000;

                return (

                  <motion.button
                    key={user.id}

                    onClick={() => {

                      setSelectedChatUser(
                        user
                      );

                      setCurrentTab(
                        "chatRoom"
                      );

                    }}

                    initial={{
                      opacity: 0,
                      y: 20,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    whileHover={{
                      scale: 1.02,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-[28px] p-4 flex items-center gap-4 hover:bg-white/[0.07] transition-all"
                  >

                    <div className="relative">

                      <img
                        src={
                          user.profilePic
                        }
                        alt="profile"
                        className="w-14 h-14 rounded-full object-cover border border-cyan-400/20"
                      />

                      <div
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black ${
                          isOnline
                            ? "bg-green-400"
                            : "bg-zinc-500"
                        }`}
                      ></div>

                    </div>

                    <div className="flex-1 text-left overflow-hidden">

  <div className="flex items-center justify-between gap-3">

    <h2 className="font-bold text-lg truncate">

      {
        user.username
      }

    </h2>

    {(
      chatMeta[
        chatId
      ]?.unreadCounts?.[
        auth.currentUser.uid
      ] || 0
    ) > 0 && (

      <div className="min-w-[24px] h-6 px-2 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black text-white shadow-[0_0_20px_rgba(168,85,247,0.8)]">

        {
          chatMeta[
            chatId
          ]?.unreadCounts?.[
            auth.currentUser.uid
          ]
        }

      </div>

    )}

  </div>

  <p className="text-zinc-400 text-sm truncate">

    {
      chatMeta[
        chatId
      ]?.lastMessage ||

      "Start chatting now"
    }

  </p>

</div>

                  </motion.button>

                );

              }
            )}

          </div>

        )}

      </div>

    </div>
  );

}