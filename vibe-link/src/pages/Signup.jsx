import { motion } from "framer-motion";

import emailjs from "@emailjs/browser";

import {
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

export default function Signup({
  setScreen,

  username,
  setUsername,

  email,
  setEmail,

  password,
  setPassword,

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

  setGeneratedOtp,

  showPassword,
  setShowPassword,
}) {

  const bioWordCount =
    bio
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  const sendOtp =
    async () => {

      const validPassword =
        password.length >= 8 &&
        password.length <= 13 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password);

      if (
        !username ||
        !email ||
        !phone ||
        !age ||
        !gender ||
        !country ||
        !bio
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
          "Enter a valid phone number"
        );

        return;

      }

      if (
        !validPassword
      ) {

        alert(
          "Password requirements not met"
        );

        return;

      }

      try {

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

          alert(
            "Username already taken"
          );

          return;

        }

        const signInMethods =
          await fetchSignInMethodsForEmail(
            auth,
            email
          );

        if (
          signInMethods.length >
          0
        ) {

          alert(
            "Account on this email already exists. Log in or use another email."
          );

          return;

        }

        const otp =
          Math.floor(
            1000 +
            Math.random() *
            9000
          ).toString();

        setGeneratedOtp(
          otp
        );

        localStorage.setItem(
          "pendingSignup",
          "true"
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

        alert(
          error.message
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
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-4 overflow-y-auto no-scrollbar max-h-[95vh]"
      >

        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          CREATE ACCOUNT

        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          maxLength={10}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <p className="text-right text-sm text-zinc-400">

          {username.length}/10

        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
        />

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
            placeholder="Password"
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
          onChange={(e) => {

            const words =
              e.target.value
                .trim()
                .split(/\s+/)
                .filter(Boolean);

            if (
              words.length <= 50
            ) {

              setBio(
                e.target.value
              );

            }

          }}
          className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 resize-none outline-none focus:border-cyan-400"
        />

        <p className="text-right text-sm text-zinc-400">

          {bioWordCount}/50 words

        </p>

        <button
          onClick={sendOtp}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
        >

          SEND OTP

        </button>

        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            setScreen(
              "loginOrSignup"
            )
          }
          className="absolute top-6 left-6 z-20 text-4xl text-cyan-400 cursor-pointer"
        >

          ←

        </motion.button>

      </motion.div>

    </div>

  );

}