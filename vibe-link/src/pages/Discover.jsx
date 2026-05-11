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

        const ageDifference =
          Math.abs(
            Number(
              user.age
            ) -
            Number(
              userData.age
            )
          );

        return (
          calculateCompatibility(
            user.vibes
          ) >= 20 &&
          ageDifference <= 3
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

          Finding your vibe tribe...

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

            NO VIBES FOUND

          </h1>

          <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed">

            Try selecting more vibes to discover your people.

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
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
        }}
        className="relative z-10 w-full max-w-sm backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[32px] p-6 shadow-[0_0_40px_rgba(0,255,255,0.10)]"
      >

        <div className="flex flex-col items-center text-center">

          <div className="relative">

            <img
              src={
                currentUser.profilePic ||
                "https://i.pravatar.cc/300"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,255,0.20)]"
            />

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1 rounded-full text-sm font-bold shadow-lg">

              {compatibility}% Vibed

            </div>

          </div>

          <div className="mt-8">

            <h1 className="text-3xl font-black">

              {
                currentUser.username
              }

            </h1>

            <p className="text-cyan-400 font-semibold mt-1">

              {
                currentUser.age
              } years old

            </p>

          </div>

          <p className="text-zinc-400 mt-5 leading-relaxed">

            {
              currentUser.bio
            }

          </p>

        </div>

        <div className="mt-8">

          <h2 className="text-lg font-bold mb-4 text-center text-purple-300">

            Shared Vibes

          </h2>

          <div className="flex flex-wrap justify-center gap-3">

            {currentUser.vibes.map(
              (vibe) => {

                const shared =
                  userData.vibes.includes(
                    vibe
                  );

                return (

                  <div
                    key={vibe}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      shared
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] scale-105"
                        : "bg-white/5 border border-white/10 text-zinc-300"
                    }`}
                  >

                    {vibe}

                  </div>

                );

              }
            )}

          </div>

        </div>

        <div className="flex gap-3 pt-8">

          <button
            onClick={
              nextUser
            }
            className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-all duration-300"
          >

            Explore More

          </button>

          <button
            onClick={
              connectUser
            }
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
          >

            Vibe

          </button>

        </div>

      </motion.div>

    </div>

  );

}