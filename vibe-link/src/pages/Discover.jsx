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
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Discover({

  userData,

  setCurrentTab,

  setSelectedChatUser,

}) {

  const [
    users,
    setUsers,
  ] = useState([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const snapshot =
            await getDocs(
              collection(
                db,
                "users"
              )
            );

          const allUsers =
            [];

          snapshot.forEach(
            (docItem) => {

              if (
                docItem.id !==
                auth.currentUser.uid
              ) {

                allUsers.push({
                  id:
                    docItem.id,

                  ...docItem.data(),
                });

              }

            }
          );

          setUsers(
            allUsers
          );

        } catch (error) {

          console.log(
            error
          );

        } finally {

          setLoading(false);

        }

      };

    fetchUsers();

  }, []);

  const calculateCompatibility =
    (userVibes = []) => {

      if (
        !userData.vibes ||
        userData.vibes.length === 0
      ) {

        return 0;

      }

      const shared =
        userVibes.filter(
          (vibe) =>
            userData.vibes.includes(
              vibe
            )
        ).length;

      return Math.round(
        (
          shared /
          userData.vibes.length
        ) * 100
      );

    };

  const matchedUsers =
    users.filter(
      (user) => {

        if (
          !user.vibes
        ) {

          return false;

        }

        return (
          calculateCompatibility(
            user.vibes
          ) >= 20
        );

      }
    );

  const currentUser =
    matchedUsers[
      currentIndex %
        matchedUsers.length
    ];

  const connectUser =
  async () => {

    try {

      await addDoc(
        collection(
          db,
          "connections"
        ),
        {
          users: [

            auth.currentUser.uid,

            currentUser.id,

          ],

          createdAt:
            serverTimestamp(),
        }
      );

      

setSelectedChatUser(
  currentUser
);

setCurrentTab(
  "chatRoom"
);

    } catch (error) {

      console.log(
        error
      );

    }

  };
  
    const nextUser =
    () => {

      setCurrentIndex(
        (prev) =>
          (
            prev + 1
          ) %
          matchedUsers.length
      );

    };

  if (loading) {

    return (
      <div className="flex items-center justify-center text-white pt-40">

        <h1 className="text-3xl font-bold animate-pulse">
          Finding your tribe...
        </h1>

      </div>
    );

  }

  if (
    matchedUsers.length === 0
  ) {

    return (
      <div className="flex items-center justify-center text-white pt-40 p-6">

        <div className="text-center space-y-6">

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            NO MATCHES YET
          </h1>

          <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Try selecting more common vibes.
          </p>

        </div>

      </div>
    );

  }

  const compatibility =
    calculateCompatibility(
      currentUser.vibes
    );

  return (
    <div className="text-white flex flex-col items-center p-6 relative">

      <motion.div
        key={currentUser.id}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
        }}
className="relative z-10 w-full max-w-sm backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.12)]"      >

        <div className="relative">

          <img
            src={
              currentUser.profilePic ||
              "https://i.pravatar.cc/500"
            }
            alt="profile"
            className="w-full h-[280px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

          <div className="absolute top-5 right-5 bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/30 px-4 py-2 rounded-full text-cyan-300 font-bold shadow-[0_0_25px_rgba(0,255,255,0.18)]">
            {compatibility}% Match
          </div>

        </div>

        <div className="p-4 space-y-2">

          <div>

            <h1 className="text-2xl font-black">
              {
                currentUser.username
              },{" "}

              <span className="text-cyan-400">
                {
                  currentUser.age
                }
              </span>
            </h1>

            <p className="text-zinc-400 mt-3 leading-relaxed">
              {
                currentUser.bio
              }
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {currentUser.vibes.map(
              (vibe) => (

                <div
                  key={vibe}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-300"
                >
                  {vibe}
                </div>

              )
            )}

          </div>

          <div className="flex gap-3 pt-1">

            <button
              onClick={
                nextUser
              }
              className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Skip
            </button>

            <button
              onClick={
                connectUser
              }
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
            >
              Connect
            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );

}