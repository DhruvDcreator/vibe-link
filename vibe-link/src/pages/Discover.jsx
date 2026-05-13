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
          ageDifference <= 12
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

        <h1 className="text-3xl font-black animate-pulse bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

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

  const sharedVibes =
    currentUser.vibes.filter(
      (vibe) =>
        userData.vibes.includes(
          vibe
        )
    );

  const otherVibes =
    currentUser.vibes.filter(
      (vibe) =>
        !userData.vibes.includes(
          vibe
        )
    );

  return (

    <div className="text-white flex flex-col items-center p-6 relative overflow-hidden">

      <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-120px]"></div>

      <div className="absolute w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-100px]"></div>

      <motion.div
        key={currentUser.id}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
        }}
        className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-3xl border border-white/15 rounded-[38px] p-6 shadow-[0_0_50px_rgba(0,255,255,0.10)] overflow-hidden"
      >

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative flex flex-col items-center text-center">

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-40 scale-110"></div>

            <img
              src={
                currentUser.profilePic ||
                "https://i.pravatar.cc/300"
              }
              alt="profile"
              className="relative w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-[0_0_30px_rgba(0,255,255,0.25)]"
            />

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 rounded-full text-sm font-black shadow-[0_0_25px_rgba(168,85,247,0.45)]">

              {compatibility}% Vibed

            </div>

          </div>

          <div className="mt-9">

            <h1 className="text-3xl font-black tracking-tight">

              {
                currentUser.username
              }

            </h1>

            <p className="text-cyan-300 font-semibold mt-1">

              {
                currentUser.age
              } years old

            </p>

          </div>

          <p className="text-zinc-300 mt-5 leading-relaxed text-[15px]">

            {
              currentUser.bio
            }

          </p>

        </div>

        <div className="relative mt-8 space-y-7">

          <div>

            <h2 className="text-center text-lg font-black mb-4 bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text">

              Vibing Together

            </h2>

            <div className="flex flex-wrap justify-center gap-3">

              {sharedVibes.map(
                (vibe) => (

                  <div
                    key={vibe}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-white/10 backdrop-blur-xl hover:scale-105 transition-all duration-300"
                  >

                    {vibe}

                  </div>

                )
              )}

            </div>

          </div>

          {otherVibes.length > 0 && (

            <div>

              <h2 className="text-center text-lg font-black mb-4 text-zinc-300">

                Also Into

              </h2>

              <div className="flex flex-wrap justify-center gap-3">

                {otherVibes.map(
                  (vibe) => (

                    <div
                      key={vibe}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-zinc-200 text-sm font-semibold hover:bg-white/10 transition-all duration-300"
                    >

                      {vibe}

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

        <div className="relative flex gap-3 pt-8">

          <button
            onClick={
              nextUser
            }
            className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl font-semibold hover:bg-white/10 transition-all duration-300"
          >

            Explore More

          </button>

          <button
            onClick={
              connectUser
            }
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
          >

            Vibe

          </button>

        </div>

      </motion.div>

    </div>

  );

}