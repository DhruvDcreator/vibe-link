import {
  motion,
} from "framer-motion";

import {
  signOut,
} from "firebase/auth";

import {
  auth,
} from "../firebase/firebase";

export default function Profile({

  userData,

  setCurrentTab,

}) {

  const logout =
    async () => {

      try {

        await signOut(
          auth
        );

        window.location.reload();

      } catch (error) {

        console.log(
          error
        );

      }

    };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="px-4 pb-24"
    >

      <div className="max-w-sm mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-6 shadow-[0_0_30px_rgba(0,255,255,0.12)]">

        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-400/40 mx-auto shadow-[0_0_40px_rgba(0,255,255,0.2)]">

          <img
            src={
              userData.profilePic
            }
            alt="profile"
            className="w-full h-full object-cover"
          />

        </div>

        <h1 className="text-3xl font-black text-center mt-6">
          @{userData.username}
        </h1>

        <p className="text-zinc-400 text-center mt-3">
          {userData.age} • {userData.country}
        </p>

        <p className="text-zinc-300 text-center mt-4 text-sm leading-relaxed">
          {userData.bio}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-5">

          {userData.vibes?.map(
            (vibe) => (

              <div
                key={vibe}
                className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm"
              >
                {vibe}
              </div>

            )
          )}

        </div>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            setCurrentTab(
              "editVibes"
            )
          }
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold cursor-pointer transition-all duration-300"
        >
          Edit Vibes
        </motion.button>

        <button
          onClick={logout}
          className="w-full mt-4 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
        >
          Logout
        </button>

      </div>

    </motion.div>
  );

}