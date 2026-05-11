import { motion } from "framer-motion";

import emailjs from "@emailjs/browser";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

export default function CompleteProfile({

  setScreen,

  email,

  password,
  setPassword,

  showPassword,
  setShowPassword,

  setGeneratedOtp,

  isGoogleSignup,

  phone,
  setPhone,

  age,
  setAge,

  gender,
  setGender,

  country,
  setCountry,

  bio,
  setBio,

}) {

  const saveProfile =
    async () => {

      try {

        if (
          !phone ||
          !age ||
          !gender ||
          !country ||
          !bio ||
          !password
        ) {

          alert(
            "Please fill all fields"
          );

          return;

        }

        if (
          !/^\d{10}$/.test(phone)
        ) {

          alert(
            "Enter valid phone number"
          );

          return;

        }

        const validPassword =
          password.length >= 8 &&
          password.length <= 13 &&
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /[0-9]/.test(password);

        if (
          !validPassword
        ) {

          alert(
            "Password requirements not met"
          );

          return;

        }

        const storedGoogleData =
  JSON.parse(
    localStorage.getItem(
      "googleSignupData"
    )
  );

const user =
  auth.currentUser;

        if (
  !user &&
  !storedGoogleData
) {

          alert(
            "No user found"
          );

          return;

        }

        if (
          isGoogleSignup
        ) {

          const credential =
            EmailAuthProvider.credential(
              email,
              password
            );

          try {

            await linkWithCredential(
              user,
              credential
            );

          } catch (error) {

            if (
              error.code !==
              "auth/provider-already-linked"
            ) {

              throw error;

            }

          }

        }

        await updateDoc(
          doc(
            db,
            "users",
            user.uid
          ),
          {
            phone,
            age,
            gender,
            country,
            bio,
          }
        );

        const otp =
          Math.floor(
            1000 +
            Math.random() *
            9000
          ).toString();

        setGeneratedOtp(
          otp
        );

        await emailjs.send(
          "service_otz8q9a",
          "template_y8t4pe2",
          {
            to_email:
              email,

            otp:
              otp,
          },
          "uYochmrCEWfNwQTMA"
        );

        setScreen(
          "otp"
        );

      } catch (error) {

        console.log(
          error
        );

        if (
          error.code ===
          "auth/credential-already-in-use"
        ) {

          alert(
            "This password/account combination already exists."
          );

          return;

        }

        alert(
          "Failed to save profile"
        );

      }

    };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[140px] top-[-150px] left-[-120px]"></div>

      <div className="absolute w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-120px]"></div>

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
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-5"
      >

        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          COMPLETE PROFILE

        </h1>

        <p className="text-center text-zinc-400">

          Just a few more details

        </p>

        <input
          type="tel"
          inputMode="numeric"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
                .replace(
                  /\D/g,
                  ""
                )
                .slice(0, 10)
            )
          }
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Create Password"
            value={password}
            maxLength={13}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-16 outline-none focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-5 top-5"
          >

            {showPassword
              ? "🙈"
              : "👁️"}

          </button>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-sm">

          <div className={`flex items-center gap-2 ${
            password.length >= 8
              ? "text-green-400"
              : "text-red-400"
          }`}>

            <span>
              {password.length >= 8
                ? "✔"
                : "✖"}
            </span>

            Minimum 8 characters

          </div>

          <div className={`flex items-center gap-2 ${
            /[A-Z]/.test(password)
              ? "text-green-400"
              : "text-red-400"
          }`}>

            <span>
              {/[A-Z]/.test(password)
                ? "✔"
                : "✖"}
            </span>

            One capital letter

          </div>

          <div className={`flex items-center gap-2 ${
            /[a-z]/.test(password)
              ? "text-green-400"
              : "text-red-400"
          }`}>

            <span>
              {/[a-z]/.test(password)
                ? "✔"
                : "✖"}
            </span>

            One small letter

          </div>

          <div className={`flex items-center gap-2 ${
            /[0-9]/.test(password)
              ? "text-green-400"
              : "text-red-400"
          }`}>

            <span>
              {/[0-9]/.test(password)
                ? "✔"
                : "✖"}
            </span>

            One number

          </div>

        </div>

        <select
          value={age}
          onChange={(e) =>
            setAge(
              e.target.value
            )
          }
          className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-2xl px-5 py-4"
        >

          <option value="">
            Select Age
          </option>

          {Array.from(
            {
              length: 13,
            },
            (_, i) =>
              i + 13
          ).map((num) => (

            <option
              key={num}
              value={num}
            >

              {num}

            </option>

          ))}

        </select>

        <select
          value={gender}
          onChange={(e) =>
            setGender(
              e.target.value
            )
          }
          className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-2xl px-5 py-4"
        >

          <option value="">
            Select Gender
          </option>

          <option>
            Male
          </option>

          <option>
            Female
          </option>

          <option>
            Other
          </option>

        </select>

        <select
          value={country}
          onChange={(e) =>
            setCountry(
              e.target.value
            )
          }
          className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-2xl px-5 py-4"
        >

          <option value="">
            Select Country
          </option>

          <option>
            India
          </option>

          <option>
            USA
          </option>

          <option>
            UK
          </option>

          <option>
            Canada
          </option>

        </select>

        <textarea
          placeholder="Describe yourself..."
          value={bio}
          onChange={(e) =>
            setBio(
              e.target.value
            )
          }
          className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 resize-none outline-none focus:border-cyan-400"
        />

        <button
          onClick={
            saveProfile
          }
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
        >

          CONTINUE

        </button>

      </motion.div>

    </div>

  );

}