import { motion } from "framer-motion";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

export default function Login({
  setScreen,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {

  const loginUser = async () => {

    if (!username || !password) {
      alert("Fill all fields 😭");
      return;
    }

    try {

      const usersSnapshot =
        await getDocs(
          collection(db, "users")
        );

      let foundEmail = "";

      usersSnapshot.forEach((doc) => {

        const data = doc.data();

        if (
          data.username === username
        ) {
          foundEmail = data.email;
        }
      });

      if (!foundEmail) {
        alert("Username not found 😭");
        return;
      }

      await signInWithEmailAndPassword(
        auth,
        foundEmail,
        password
      );

      setScreen("loginSuccess");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScreen("loginOrSignup")}
        className="absolute top-6 left-6 z-20 text-4xl text-cyan-400 cursor-pointer"
      >
        ←
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-5 shadow-[0_0_60px_rgba(0,255,255,0.12)]"
      >

        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          LOGIN
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-16 outline-none focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-5"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

        </div>

        <button
          onClick={loginUser}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
        >
          LOGIN
        </button>

      </motion.div>

    </div>
  );
}