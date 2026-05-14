import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import OTPBoxes from "../components/OTPBoxes";

import emailjs from "@emailjs/browser";

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
          attempts >= 2
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

          await setDoc(
            doc(
              db,
              "usernames",
              username
            ),
            {
              uid:
                user.uid,
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
          ),
          {
            uid:
              user.uid,
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
            "Email already exists"
          );

          setScreen(
            "login"
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
          "service_otz8q9a",
          "template_y8t4pe2",
          {
            to_email:
              email,

            otp:
              newOtp,
          },
          "uYochmrCEWfNwQTMA"
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

    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-black to-cyan-500/10"></div>

      <div className="absolute w-[450px] h-[450px] bg-green-500/20 rounded-full blur-[140px] top-[-150px] left-[-120px]"></div>

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-120px]"></div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 text-center space-y-8"
      >

        <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text">

          VERIFY OTP

        </h1>

        <p className="text-zinc-400 leading-relaxed">

          Enter the OTP sent to

          <br />

          <span className="text-green-400 font-bold">

            {email}

          </span>

        </p>

        <OTPBoxes
          otp={otp}
          setOtp={setOtp}
          otpLocked={otpLocked}
        />

        {loading ? (

          <div className="text-cyan-400 font-bold animate-pulse">

            VERIFYING...

          </div>

        ) : null}

        {timer > 0 ? (

          <p className="text-zinc-400">

            OTP expires in{" "}

            <span className="text-cyan-400 font-bold">

              {timer}s

            </span>

          </p>

        ) : (

          <button
            onClick={
              resendOtp
            }
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            RESEND OTP

          </button>

        )}

      </motion.div>

    </div>

  );

}