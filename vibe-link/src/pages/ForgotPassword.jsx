import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  auth,
} from "../firebase/firebase";

export default function ForgotPassword({
  setScreen,
}) {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendResetLink =
    async () => {

      if (!email) {

        alert(
          "Enter your email 😭"
        );

        return;

      }

      try {

        setLoading(true);

        await sendPasswordResetEmail(
          auth,
          email
        );

        alert(
          "Password reset email sent. If you don’t receive it, check your spam folder or make sure you entered your registered email address correctly."        );

        setScreen(
          "login"
        );

      } catch (error) {

        if (
  error.code ===
  "auth/user-not-found"
) {

  alert(
    "No account found with this email."
  );

} else if (
  error.code ===
  "auth/invalid-email"
) {

  alert(
    "Invalid email address."
  );

} else {

  alert(
    "Something went wrong. Please try again."
  );

}
      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <motion.button
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() =>
          setScreen(
            "login"
          )
        }
        className="absolute top-6 left-6 z-20 text-4xl text-cyan-400 cursor-pointer"
      >

        ←

      </motion.button>

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-6 shadow-[0_0_60px_rgba(0,255,255,0.12)]"
      >

        <h1 className="text-4xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          RESET PASSWORD

        </h1>

        <p className="text-zinc-400 text-center">

          Enter your registered email to receive a password reset link.

        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <button
          onClick={sendResetLink}
          disabled={loading}
          className="w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
        >

          {loading
            ? "Sending..."
            : "Send Reset Link"}

        </button>

        <p className="pt-4 text-sm text-zinc-400 text-center tracking-wide leading-relaxed">

  © 2026 Vibe Link™ — Dhruv Dhanuka. All rights reserved.

</p>

      </motion.div>

    </div>

  );

}