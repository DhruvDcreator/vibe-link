import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import OTPBoxes from "../components/OTPBoxes";

import emailjs from "@emailjs/browser";

import welcomeLogo from "../assets/vllogo.png";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

export default function OTP({
  email,
  password,
  username,
  phone,
  age,
  gender,
  country,
  bio,

  generatedOtp,
  setGeneratedOtp,

  isGoogleSignup,

  setScreen,
}) {

  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
    ]);

  const [timer, setTimer] =
    useState(60);

  const [
    resendCount,
    setResendCount,
  ] = useState(0);

  const [
    wrongAttempts,
    setWrongAttempts,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
  otpLocked,
  setOtpLocked,
] = useState(false);

  const verificationTriggered =
    useRef(false);

  useEffect(() => {

    localStorage.setItem(
      "pendingSignup",
      "true"
    );

  }, []);

  useEffect(() => {

    if (timer <= 0) {
      return;
    }

    const interval =
      setInterval(() => {

        setTimer(
          (prev) =>
            prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(
        interval
      );

  }, [timer]);

  const startOver =
    () => {

      verificationTriggered.current =
        false;

      localStorage.removeItem(
        "pendingSignup"
      );

      alert(
        "Too many wrong attempts. Start over."
      );

      setScreen(
        "welcome"
      );

    };

  const verifyOtp =
    async () => {

      if (
        loading ||
        verificationTriggered.current
      ) {
        return;
      }

      const enteredOtp =
        otp.join("");

      if (
        enteredOtp.length !==
        4
      ) {
        return;
      }
      setOtpLocked(true);


      verificationTriggered.current =
        true;

      if (
        enteredOtp !==
        generatedOtp
      ) {

        verificationTriggered.current =
          false;

        const attempts =
          wrongAttempts + 1;

        setWrongAttempts(
          attempts
        );

        setOtp([
          "",
          "",
          "",
          "",
        ]);
        setOtpLocked(false);

        if (
          attempts >= 2 ||

(
  resendCount >= 1 &&
  attempts >= 1
)
        ) {

          startOver();

          return;

        }

        alert(
          "Wrong OTP"
        );

        return;

      }

      try {

        setLoading(true);

        if (
          isGoogleSignup
        ) {

          const user =
            auth.currentUser;

          if (!user) {

            alert(
              "Google session expired"
            );

            setScreen(
              "signup"
            );

            return;

          }

          await setDoc(
            doc(
              db,
              "users",
              user.uid
            ),
            {
              username,
              email,
              phone,
              age,
              gender,
              country,
              bio,
              verified:
                true,
            },
            {
              merge: true,
            }
          );
console.log(
  "EMAIL VALUE:",
  email
);
          await setDoc(

  doc(
    db,
    "usernames",
    username
      .trim()
      .toLowerCase()
  ),

  {

    uid:
      user.uid,

    email:
      email,

  }

);

          localStorage.removeItem(
            "pendingSignup"
          );

          setTimeout(() => {

            setScreen(
              "signupSuccess"
            );

          }, 500);

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

          verificationTriggered.current =
            false;

            setOtpLocked(false);

          alert(
            "Username already taken"
          );

          setLoading(false);

          return;

        }

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user =
          userCredential.user;

        await setDoc(
          doc(
            db,
            "users",
            user.uid
          ),
          {
            username,
            email,
            phone,
            age,
            gender,
            country,
            bio,
            verified:
              true,
          }
        );

        await setDoc(

  doc(
    db,
    "usernames",
    username
      .trim()
      .toLowerCase()
  ),

  {

    uid:
      user.uid,

    email:
      email,

  }

);

        localStorage.removeItem(
          "pendingSignup"
        );

        setTimeout(() => {

          setScreen(
            "signupSuccess"
          );

        }, 500);

      } catch (error) {

        console.log(
          error
        );

        verificationTriggered.current =
          false;
          setOtpLocked(false);

        if (

  error.code ===
  "auth/email-already-in-use"

) {

  alert(
    "An account with this email already exists."
  );

  setScreen(
    "auth"
  );

  return;

}

        alert(
          error.message
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    const enteredOtp =
      otp.join("");

    if (
      enteredOtp.length ===
      4
    ) {

      const timeout =
        setTimeout(() => {

          verifyOtp();

        }, 600);

      return () =>
        clearTimeout(
          timeout
        );

    }

  }, [otp]);

  const resendOtp =
    async () => {

      if (loading) {
        return;
      }

      if (
        resendCount >= 1
      ) {

        startOver();

        return;

      }

      try {

        setLoading(true);

        verificationTriggered.current =
          false;

        const newOtp =
          Math.floor(
            1000 +
            Math.random() *
            9000
          ).toString();

        setGeneratedOtp(
          newOtp
        );

        await emailjs.send(
          "service_6xy30ia",
          "template_0dyw2wl",
          {
            to_email:
              email,

            otp:
              newOtp,
          },
          "agiLAySvLuJA74eKO"
        );

        setResendCount(
          resendCount + 1
        );

        setTimer(60);

        setOtp([
          "",
          "",
          "",
          "",
        ]);
        setOtpLocked(false);

        alert(
          "New OTP sent"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to resend OTP"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

  <div className="relative min-h-screen overflow-hidden bg-[#03040A] flex items-center justify-center text-white px-6"style={{
  paddingTop: "env(safe-area-inset-top)"
}}>

    {/* BACKGROUND */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]"></div>

    {/* PLANET RINGS */}
    <div className="absolute top-[-240px] left-[-240px] w-[520px] h-[520px] rounded-full border border-cyan-400/10"></div>

    <div className="absolute bottom-[-260px] right-[-260px] w-[560px] h-[560px] rounded-full border border-purple-400/10"></div>

    {/* GLOWS */}
    <div className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-cyan-500/10 rounded-full blur-[120px]"></div>

    <div className="absolute bottom-[10%] right-[5%] w-[320px] h-[320px] bg-purple-500/10 rounded-full blur-[120px]"></div>

    {/* STARS */}
    <div className="absolute inset-0 opacity-70 pointer-events-none">

      <div className="absolute top-[12%] left-[22%] w-[2px] h-[2px] bg-white rounded-full animate-pulse"></div>

      <div className="absolute top-[28%] right-[18%] w-[3px] h-[3px] bg-cyan-300 rounded-full animate-pulse"></div>

      <div className="absolute bottom-[22%] left-[16%] w-[2px] h-[2px] bg-purple-300 rounded-full animate-pulse"></div>

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

      {/* CARD */}
      <div className="
        bg-white/[0.035]
        border
        border-white/10
        rounded-[34px]
        p-7
        backdrop-blur-3xl
        shadow-[0_0_80px_rgba(0,212,255,0.06)]
      ">

        {/* ICON */}
        <div className="flex justify-center mb-7">

          <div className="
            w-[95px]
            h-[95px]
            rounded-full
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-cyan-500/20
            to-purple-500/20
            border
            border-white/10
            shadow-[0_0_40px_rgba(168,85,247,0.14)]
            text-5xl
          ">

            ✉️

          </div>

        </div>

        {/* TITLE */}
        <div className="text-center">

          <h1 className="
            text-4xl
            font-bold
            text-white
          ">

            Verify OTP

          </h1>

          <p className="
            mt-4
            text-zinc-400
            leading-relaxed
          ">

            We've sent a verification code to

            <br />

            <span className="
              text-cyan-300
              font-medium
            ">

              {email}

            </span>

          </p>

        </div>

        {/* OTP BOXES */}
        <div className="mt-10">

          <OTPBoxes
            otp={otp}
            setOtp={setOtp}
            otpLocked={otpLocked}
          />

        </div>

        {/* VERIFYING */}
        {
          loading && (

            <div className="
              mt-7
              text-center
              text-cyan-300
              font-medium
              animate-pulse
              tracking-wide
            ">

              VERIFYING...

            </div>

          )
        }

        {/* TIMER */}
        <div className="mt-8 text-center">

          {
            timer > 0 ? (

              <p className="
                text-zinc-400
                text-sm
              ">

                Resend available in{" "}

                <span className="
                  text-cyan-300
                  font-semibold
                ">

                  {timer}s

                </span>

              </p>

            ) : (

              <button
                onClick={
                  resendOtp
                }
                disabled={loading}
                className="
                  w-full
                  py-5
                  rounded-[24px]
                  text-sm
                  tracking-[0.3em]
                  font-semibold
                  transition-all
                  duration-300
                  cursor-pointer

                  bg-gradient-to-r
                  from-cyan-400
                  via-purple-500
                  to-pink-400

                  text-white

                  shadow-[0_0_60px_rgba(168,85,247,0.35)]

                  hover:shadow-[0_0_90px_rgba(168,85,247,0.5)]

                  disabled:opacity-50
                "
              >

                RESEND OTP

              </button>

            )
          }

        </div>

      </div>

      {/* COPYRIGHT */}
      <p className="
        mt-8
        text-xs
        text-zinc-500
        text-center
        tracking-wide
        leading-relaxed
      ">

        © 2026 VibeLink™ — Dhruv Dhanuka.

        <br />

        All rights reserved.

      </p>

    </motion.div>

  </div>

);

}