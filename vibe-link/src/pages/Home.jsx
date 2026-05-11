import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Compass,
  MessageCircle,
  User,
} from "lucide-react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

import Discover from "./Discover";

import Profile from "./Profile";

import EditVibes from "./EditVibes";

import Chats from "./Chats";

import ChatRoom from "./ChatRoom";

export default function Home() {

  const [
    currentTab,
    setCurrentTab,
  ] = useState(
    "discover"
  );

  const [
    userData,
    setUserData,
  ] = useState(null);

  const [
    selectedChatUser,
    setSelectedChatUser,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    hasUnread,
    setHasUnread,
  ] = useState(false);

  useEffect(() => {

    let interval;

    const unsubscribe =
      onAuthStateChanged(
        auth,

        async (user) => {

          try {

            if (!user) {

              setLoading(
                false
              );

              return;

            }

            const snapshot =
              await getDoc(
                doc(
                  db,
                  "users",
                  user.uid
                )
              );

            if (
              snapshot.exists()
            ) {

              setUserData({
                uid:
                  user.uid,

                ...snapshot.data(),
              });

              await setDoc(
                doc(
                  db,
                  "presence",
                  user.uid
                ),
                {
                  lastActive:
                    Date.now(),
                }
              );

              interval =
                setInterval(
                  async () => {

                    if (
                      auth.currentUser
                    ) {

                      await setDoc(
                        doc(
                          db,
                          "presence",
                          auth.currentUser.uid
                        ),
                        {
                          lastActive:
                            Date.now(),
                        }
                      );

                    }

                  },

                  2000
                );

              const q =
                query(
                  collection(
                    db,
                    "chatMeta"
                  )
                );

              onSnapshot(
                q,

                (snapshot) => {

                  let unread =
                    false;

                  snapshot.forEach(
                    (
                      docItem
                    ) => {

                      const data =
                        docItem.data();

                      if (
                        data
                          ?.unreadCounts?.[
                          user.uid
                        ] > 0
                      ) {

                        unread =
                          true;

                      }

                    }
                  );

                  setHasUnread(
                    unread
                  );

                }
              );

            }

          } catch (error) {

            console.log(
              error
            );

          } finally {

            setLoading(
              false
            );

          }

        }
      );

    return () => {

      if (
        interval
      ) {

        clearInterval(
          interval
        );

      }

      unsubscribe();

    };

  }, []);

  if (
    loading ||
    !userData
  ) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        <h1 className="text-3xl font-bold animate-pulse">

          Loading...

        </h1>

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[80px] top-[-150px] left-[-120px]"></div>

      <div className="absolute w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[80px] bottom-[-150px] right-[-120px]"></div>

      {currentTab !==
      "chatRoom" && (

        <>

          <div className="relative z-20 px-6 pt-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400 text-sm">

                  Your vibe.

                </p>

                <h1 className="text-4xl font-black mt-1">

                  Your tribe.

                </h1>

              </div>

              <motion.button
                whileTap={{
                  scale: 0.92,
                }}
                onClick={() =>
                  setCurrentTab(
                    "profile"
                  )
                }
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
              >

                <img
                  src={
                    userData.profilePic
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />

              </motion.button>

            </div>

          </div>

          <div className="relative z-10 pt-6 pb-24 px-4">

            {currentTab ===
            "discover" && (

              <Discover
                userData={
                  userData
                }

                setCurrentTab={
                  setCurrentTab
                }

                setSelectedChatUser={
                  setSelectedChatUser
                }
              />

            )}

            {currentTab ===
            "chats" && (

              <Chats
                setCurrentTab={
                  setCurrentTab
                }

                setSelectedChatUser={
                  setSelectedChatUser
                }
              />

            )}

            {currentTab ===
            "profile" && (

              <Profile
                userData={
                  userData
                }

                setCurrentTab={
                  setCurrentTab
                }
              />

            )}

            {currentTab ===
            "editVibes" && (

              <EditVibes
                userData={
                  userData
                }

                setUserData={
                  setUserData
                }

                setCurrentTab={
                  setCurrentTab
                }
              />

            )}

          </div>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-8 py-4 flex items-center gap-10 shadow-[0_0_40px_rgba(0,255,255,0.15)]">

            <button
              onClick={() =>
                setCurrentTab(
                  "discover"
                )
              }
              className={`transition-all duration-300 ${
                currentTab ===
                "discover"
                  ? "text-cyan-400 scale-110"
                  : "text-zinc-500"
              }`}
            >

              <Compass size={30} />

            </button>

            <button
              onClick={() =>
                setCurrentTab(
                  "chats"
                )
              }
              className={`relative transition-all duration-300 ${
                currentTab ===
                "chats"
                  ? "text-cyan-400 scale-110"
                  : "text-zinc-500"
              }`}
            >

              <MessageCircle size={30} />

              {hasUnread && (

                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.9)]"></div>

              )}

            </button>

            <button
              onClick={() =>
                setCurrentTab(
                  "profile"
                )
              }
              className={`transition-all duration-300 ${
                currentTab ===
                "profile"
                  ? "text-cyan-400 scale-110"
                  : "text-zinc-500"
              }`}
            >

              <User size={30} />

            </button>

          </div>

        </>

      )}

      {currentTab ===
      "chatRoom" && (

        <ChatRoom
          selectedUser={
            selectedChatUser
          }

          setCurrentTab={
            setCurrentTab
          }
        />

      )}

    </div>

  );

}