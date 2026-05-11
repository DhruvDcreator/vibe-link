import {
  motion,
} from "framer-motion";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

export default function LoginSuccess({
  setScreen,
}) {

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    profilePic,
    setProfilePic,
  ] = useState("");

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const user =
            auth.currentUser;

          if (!user) {

            return;

          }

          const userDoc =
            await getDoc(
              doc(
                db,
                "users",
                user.uid
              )
            );

          if (
            userDoc.exists()
          ) {

            const data =
              userDoc.data();

            setUsername(
              data.username
            );

            setProfilePic(
              data.profilePic
            );

          }

        } catch (error) {

          console.log(
            error
          );

        }

      };

    fetchUser();

  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative px-6">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[140px] top-[-150px] left-[-120px]"></div>

      <div className="absolute w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-120px]"></div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-10 text-center shadow-[0_0_60px_rgba(0,255,255,0.15)]"
      >

        <motion.div
          initial={{
            scale: 0,
            rotate: -180,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 160,
          }}
          className="flex justify-center"
        >

          {profilePic ? (

            <img
              src={profilePic}
              alt="profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
            />

          ) : (

            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-5xl font-black border-4 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.25)]">
              {username
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

          )}

        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="text-5xl font-black mt-10 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
        >
          Welcome Back
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.7,
          }}
          className="text-2xl text-white mt-5 font-semibold"
        >
          {username}
        </motion.p>

        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
          onClick={() =>
            setScreen(
              "home"
            )
          }
          className="mt-10 w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
        >
          ENTER APP
        </motion.button>

      </motion.div>

    </div>
  );
}