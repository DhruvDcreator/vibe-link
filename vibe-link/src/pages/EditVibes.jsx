import {
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
  doc,
  updateDoc,
} from "firebase/firestore";

const vibeOptions = [

  "Music",
  "Gaming",
  "Fitness",
  "Photography",
  "Travel",

  "Movies",
  "Dating",
  "Reading",
  "Singing",
  "Coding",

  "Food",
  "Aesthetic",
  "Night Owl",
  "Coffee",
  "Art",

  "Sports",
  "Deep Talks",
  "Fashion",
  "Memes",
  "Dark Humor",

];

export default function EditVibes({

  userData,

  setUserData,

  setCurrentTab,

}) {

  const [
    selectedVibes,
    setSelectedVibes,
  ] = useState(
    userData.vibes || []
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const toggleVibe =
    (vibe) => {

      if (
        selectedVibes.includes(
          vibe
        )
      ) {

        setSelectedVibes(
          selectedVibes.filter(
            (item) =>
              item !== vibe
          )
        );

      } else {

        if (
          selectedVibes.length >= 7
        ) {

          alert(
            "Maximum 7 vibes allowed"
          );

          return;

        }

        setSelectedVibes([
          ...selectedVibes,
          vibe,
        ]);

      }

    };

  const saveVibes =
    async () => {

      try {

        if (
  selectedVibes.length === 0
) {

  alert(
    "Select at least 1 vibe"
  );

  return;

}

        setLoading(true);

        await updateDoc(
          doc(
            db,
            "users",
            auth.currentUser.uid
          ),
          {
            vibes:
              selectedVibes,
          }
        );

        setUserData({
          ...userData,

          vibes:
            selectedVibes,
        });

        setCurrentTab(
          "profile"
        );

      } catch (error) {

        console.log(
          error
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="px-6 pb-32">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="max-w-md mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-8 shadow-[0_0_40px_rgba(0,255,255,0.12)]"
      >

        <h1 className="text-4xl font-black text-center">
          Edit Vibes
        </h1>

        <p className="text-zinc-400 text-center mt-3">
          Choose up to 7 vibes
        </p>

        <p className="text-cyan-400 text-center mt-5 font-bold">
          {selectedVibes.length}/7 selected
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10">

          {vibeOptions.map(
            (vibe) => {

              const selected =
                selectedVibes.includes(
                  vibe
                );

              return (

                <motion.button
                  key={vibe}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  onClick={() =>
                    toggleVibe(
                      vibe
                    )
                  }
                  className={`px-5 py-3 rounded-full border cursor-pointer transition-all duration-300 ${
                    selected
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 border-transparent text-white shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                      : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {vibe}
                </motion.button>

              );

            }
          )}

        </div>

        <button
          onClick={saveVibes}
          disabled={loading}
          className="w-full mt-10 bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold hover:scale-105 cursor-pointer transition-all duration-300"
        >
          {loading
            ? "SAVING..."
            : "SAVE"}
        </button>

      </motion.div>

    </div>
  );

}