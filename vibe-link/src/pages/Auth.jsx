import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import welcomeLogo from "../assets/vllogo.png";

export default function Auth({

  setScreen,

  isLogin,
  setIsLogin,

  username,
  setUsername,

  email,
  setEmail,

  password,
  setPassword,

  showPassword,
  setShowPassword,

  loginUser,
  sendOtp,

}) {

  const [loading, setLoading] = useState(false);

  const [dob, setDob] = useState("");

  const [agreedAge, setAgreedAge] = useState(false);

  const [agreedTerms, setAgreedTerms] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState("");

  const abusiveWords = [
    "fuck",
    "bitch",
    "sex",
    "niga",
    "nigga",
    "asshole",
    "slut",
    "porn",
    "admin",
  ];

  const calculateAge = (birthDate) => {

    const today = new Date();

    const birth = new Date(birthDate);

    let age =
      today.getFullYear() -
      birth.getFullYear();

    const monthDifference =
      today.getMonth() -
      birth.getMonth();

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() <
        birth.getDate()
      )
    ) {

      age--;

    }

    return age;

  };

  useEffect(() => {

    const checkUsername = async () => {

      if (
        isLogin ||
        !username
      ) {

        setUsernameStatus("");

        return;

      }

      const lower =
        username.toLowerCase();

      const abusive =
        abusiveWords.some(
          (word) =>
            lower.includes(word)
        );

      if (abusive) {

        setUsernameStatus(
          "abusive"
        );

        return;

      }

      const usernameRef =
        doc(
          db,
          "usernames",
          username
        );

      const usernameSnap =
        await getDoc(
          usernameRef
        );

      if (
        usernameSnap.exists()
      ) {

        setUsernameStatus(
          "taken"
        );

      } else {

        setUsernameStatus(
          "available"
        );

      }

    };

    checkUsername();

  }, [username, isLogin]);

  const validPassword =
    password.length >= 8 &&
    password.length <= 13 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const handleAction =
    async () => {

      console.log("HANDLE ACTION RUNNING");

      if (loading) return;

      setLoading(true);

      try {

        if (isLogin) {

          await loginUser();

        } else {

          if (
            usernameStatus !==
            "available"
          ) {

            alert(
              "Choose another username"
            );

            setLoading(false);

            return;

          }

          if (
            !validPassword
          ) {

            alert(
              "Password requirements not met"
            );

            setLoading(false);

            return;

          }

          const age =
            calculateAge(dob);

          if (
            age < 13
          ) {

            alert(
              "You must be at least 13 years old."
            );

            setLoading(false);

            return;

          }

          if (
            !agreedAge
          ) {

            alert(
              "Please confirm your age."
            );

            setLoading(false);

            return;

          }

          if (
            !agreedTerms
          ) {

            alert(
              "Accept Terms & Privacy Policy."
            );

            setLoading(false);

            return;

          }

          await sendOtp();

        }

      } finally {

        setLoading(false);

      }

    };

 return (

  <div className="relative min-h-screen overflow-hidden bg-[#03040A] flex items-center justify-center text-white px-6">

    {/* BACKGROUND */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]"></div>

    {/* PLANET RINGS */}
    <div className="absolute top-[-240px] left-[-240px] w-[520px] h-[520px] rounded-full border border-cyan-400/10"></div>

    <div className="absolute bottom-[-260px] right-[-260px] w-[560px] h-[560px] rounded-full border border-purple-400/10"></div>

    {/* GLOWS */}
    <div className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-cyan-500/10 rounded-full blur-[120px]"></div>

    <div className="absolute bottom-[10%] right-[5%] w-[320px] h-[320px] bg-purple-500/10 rounded-full blur-[120px]"></div>

    <div className="absolute top-[40%] left-[35%] w-[240px] h-[240px] bg-pink-500/5 rounded-full blur-[100px]"></div>

    {/* STARS */}
    <div className="absolute inset-0 opacity-70 pointer-events-none">

      <div className="absolute top-[12%] left-[22%] w-[2px] h-[2px] bg-white rounded-full animate-pulse"></div>

      <div className="absolute top-[28%] right-[18%] w-[3px] h-[3px] bg-cyan-300 rounded-full animate-pulse"></div>

      <div className="absolute bottom-[22%] left-[16%] w-[2px] h-[2px] bg-purple-300 rounded-full animate-pulse"></div>

      <div className="absolute top-[45%] right-[10%] w-[2px] h-[2px] bg-pink-300 rounded-full animate-pulse"></div>

    </div>

    {/* MAIN */}
    <motion.div

      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.8,
      }}

      className="
  relative
  z-10
  w-full
  max-w-[430px]
  pt-10
  pb-8
"
    >

      {/* BACK */}
      <button
        onClick={() =>
          setScreen("welcome")
        }
        className="
          absolute
          top-2
          left-0
          text-3xl
          text-cyan-300
          hover:scale-110
          transition-all
          cursor-pointer
        "
      >

        ←

      </button>

      {/* LOGO */}
      <div className="flex justify-center mb-7">

        <img
          src={welcomeLogo}
          alt="VibeLink"
          className="
            w-[135px]
            object-contain
            select-none
            drop-shadow-[0_0_70px_rgba(168,85,247,0.16)]
          "
        />

      </div>

      {/* TOGGLE */}
      <div className="
        relative
        flex
        items-center
        bg-white/[0.05]
        border
        border-white/10
        rounded-full
        p-1.5
        mb-8
        backdrop-blur-2xl
        overflow-hidden
      ">

        <motion.div

          animate={{
            x: isLogin ? "0%" : "100%",
          }}

          transition={{
            type: "spring",
            stiffness: 240,
            damping: 24,
          }}

          className="
            absolute
            top-[6px]
            left-[6px]
            w-[calc(50%-6px)]
            h-[calc(100%-12px)]
            rounded-full
            bg-gradient-to-r
            from-cyan-500/30
            via-purple-500/30
            to-pink-500/30
            border
            border-white/10
            shadow-[0_0_35px_rgba(168,85,247,0.18)]
          "
        />

        <button
          onClick={() =>
            setIsLogin(true)
          }
          className={`
            relative
            z-10
            flex-1
            py-3
            rounded-full
            text-sm
            tracking-[0.25em]
            transition-all
            duration-300

            ${
              isLogin
                ? "text-white"
                : "text-zinc-500"
            }
          `}
        >

          LOGIN

        </button>

        <button
          onClick={() =>
            setIsLogin(false)
          }
          className={`
            relative
            z-10
            flex-1
            py-3
            rounded-full
            text-sm
            tracking-[0.25em]
            transition-all
            duration-300

            ${
              !isLogin
                ? "text-white"
                : "text-zinc-500"
            }
          `}
        >

          SIGN UP

        </button>

      </div>

      {/* FORM CONTAINER */}
      <div className="
        bg-white/[0.035]
        border
        border-white/10
        rounded-[34px]
        p-7
        backdrop-blur-3xl
        shadow-[0_0_80px_rgba(0,212,255,0.06)]
      ">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="
            text-4xl
            font-bold
            text-white
          ">

            {
              isLogin
                ? "Welcome Back"
                : "Create Account"
            }

          </h1>

          <p className="
            mt-3
            text-zinc-400
            text-sm
            tracking-wide
          ">

            {
              isLogin
                ? "Continue your journey"
                : "Enter the VibeLink universe"
            }

          </p>

        </div>

        {/* INPUTS */}
        <div className="space-y-5">

          {/* USERNAME */}
          <div>

            <input
              type="text"
              placeholder="Username"
              value={username}
              maxLength={12}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white/[0.045]
                border
                border-white/10
                rounded-[22px]
                px-5
                py-4
                outline-none
                text-white
                placeholder:text-zinc-500
                backdrop-blur-2xl
                transition-all
                duration-300
                focus:border-cyan-400/60
                focus:bg-white/[0.06]
                focus:shadow-[0_0_25px_rgba(0,212,255,0.12)]
                hover:border-white/20
              "
            />

            {
              !isLogin &&
              username && (

                <p className={`
                  mt-2
                  text-sm

                  ${
                    usernameStatus === "available"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}>

                  {
                    usernameStatus === "available"

                      ? "Username available"

                      : usernameStatus === "taken"

                        ? "Username already taken"

                        : "Abusive username not allowed"
                  }

                </p>

              )
            }

          </div>

          {/* EMAIL */}
          {
            !isLogin && (

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white/[0.045]
                  border
                  border-white/10
                  rounded-[22px]
                  px-5
                  py-4
                  outline-none
                  text-white
                  placeholder:text-zinc-500
                  backdrop-blur-2xl
                  transition-all
                  duration-300
                  focus:border-cyan-400/60
                  focus:bg-white/[0.06]
                  focus:shadow-[0_0_25px_rgba(0,212,255,0.12)]
                  hover:border-white/20
                "
              />

            )
          }

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              maxLength={13}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white/[0.045]
                border
                border-white/10
                rounded-[22px]
                px-5
                py-4
                pr-14
                outline-none
                text-white
                placeholder:text-zinc-500
                backdrop-blur-2xl
                transition-all
                duration-300
                focus:border-cyan-400/60
                focus:bg-white/[0.06]
                focus:shadow-[0_0_25px_rgba(0,212,255,0.12)]
                hover:border-white/20
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-4
                text-xl
                cursor-pointer
              "
            >

              {
                showPassword
                  ? "🙈"
                  : "👁️"
              }

            </button>

          </div>

          {/* PASSWORD CHECKER */}
          {
            !isLogin && (

              <div className="
                bg-white/[0.03]
                border
                border-white/5
                rounded-[24px]
                p-4
                text-sm
                space-y-2
              ">

                <div className={`${password.length >= 8 ? "text-green-400" : "text-zinc-500"}`}>
                  • Minimum 8 characters
                </div>

                <div className={`${/[A-Z]/.test(password) ? "text-green-400" : "text-zinc-500"}`}>
                  • One capital letter
                </div>

                <div className={`${/[a-z]/.test(password) ? "text-green-400" : "text-zinc-500"}`}>
                  • One small letter
                </div>

                <div className={`${/[0-9]/.test(password) ? "text-green-400" : "text-zinc-500"}`}>
                  • One number
                </div>

                <div className={`${/[^A-Za-z0-9]/.test(password) ? "text-green-400" : "text-zinc-500"}`}>
                  • One special character
                </div>

              </div>

            )
          }

          {/* DOB */}
          {
  !isLogin && (

    <div>

      <p className="
        mb-2
        ml-1
        text-sm
        text-zinc-400
        tracking-wide
      ">

        Date of Birth

      </p>

      <input
        type="date"
        value={dob}
        onChange={(e) =>
          setDob(
            e.target.value
          )
        }
        className="
  w-full
  h-[56px]
  min-h-[56px]
  max-h-[56px]

  appearance-none

  bg-white/[0.045]
  border
  border-white/10
  rounded-[22px]

  px-5

  outline-none

  text-sm
  text-zinc-400

  backdrop-blur-2xl

  transition-all
  duration-300

  focus:border-cyan-400/60
  focus:bg-white/[0.06]
  focus:shadow-[0_0_25px_rgba(0,212,255,0.12)]

  hover:border-white/20
"
        style={{
  colorScheme: "dark",
  WebkitAppearance: "none",
}}
      />

    </div>

  )
}

          

          {/* SIGNUP OPTIONS */}
          {
            !isLogin && (

              <div className="
                pt-2
                space-y-4
                text-sm
              ">

                <label className="
                  flex
                  items-start
                  gap-3
                  text-zinc-400
                ">

                  <input
                    type="checkbox"
                    checked={agreedAge}
                    onChange={() =>
                      setAgreedAge(
                        !agreedAge
                      )
                    }
                  />

                  I confirm I am above 13 years old.

                </label>

                <label className="
                  flex
                  items-start
                  gap-3
                  text-zinc-400
                ">

                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={() =>
                      setAgreedTerms(
                        !agreedTerms
                      )
                    }
                  />

                  <span>

                    I agree to the{" "}

                    <span
                      onClick={() =>
                        setScreen("terms")
                      }
                      className="
                        text-cyan-400
                        cursor-pointer
                        hover:underline
                      "
                    >

                      Terms & Conditions

                    </span>

                    {" "}and{" "}

                    <span
                      onClick={() =>
                        setScreen("privacy")
                      }
                      className="
                        text-cyan-400
                        cursor-pointer
                        hover:underline
                      "
                    >

                      Privacy Policy

                    </span>

                  </span>

                </label>

              </div>

            )
          }

          {/* BUTTON */}
          <motion.button

            whileHover={{
              scale: loading
                ? 1
                : 1.03,
            }}

            whileTap={{
              scale: loading
                ? 1
                : 0.97,
            }}

            onClick={handleAction}

            disabled={loading}

            className={`
              mt-4
              w-full
              py-5
              rounded-[24px]
              text-sm
              tracking-[0.3em]
              font-semibold
              transition-all
              duration-300
              cursor-pointer

              ${
                loading

                  ? "bg-zinc-700 opacity-70"

                  : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 text-white shadow-[0_0_60px_rgba(168,85,247,0.35)] hover:shadow-[0_0_90px_rgba(168,85,247,0.5)]"
              }
            `}
          >

            {
              loading
                ? "LOADING..."
                : isLogin
                  ? "LOGIN"
                  : "SEND OTP"
            }

          </motion.button>

        </div>

      </div>

      {/* COPYRIGHT */}
      <p className="
        mt-8
        text-xs
        text-zinc-500
        text-center
        tracking-wide
      ">

        © 2026 VibeLink™ — Dhruv Dhanuka.

      </p>

    </motion.div>

  </div>

);

}