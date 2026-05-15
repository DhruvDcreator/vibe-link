import {
  useState,
  useEffect,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "./firebase/firebase";

import Welcome from "./pages/Welcome";

import Auth from "./pages/Auth";

import OTP from "./pages/OTP";

import SignupSuccess from "./pages/SignupSuccess";

import LoginSuccess from "./pages/LoginSuccess";

import Vibes from "./pages/Vibes";

import CompleteProfile from "./pages/CompleteProfile";

import ProfilePicture from "./pages/ProfilePicture";

import Discover from "./pages/Discover";

import Home from "./pages/Home";

import ForgotPassword from "./pages/ForgotPassword";

import Terms from "./pages/Terms";

import Privacy from "./pages/Privacy";

import emailjs from "@emailjs/browser";

export default function App() {

  const [screen, setScreen] =
  useState(null);

  const [
    authChecked,
    setAuthChecked,
  ] = useState(false);

  const [
  appReady,
  setAppReady,
] = useState(false);

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [age, setAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [
    generatedOtp,
    setGeneratedOtp,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isGoogleSignup,
    setIsGoogleSignup,
  ] = useState(false);

  const [
    selectedVibes,
    setSelectedVibes,
  ] = useState([]);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,

        (user) => {

          const pendingSignup =
            localStorage.getItem(
              "pendingSignup"
            );

          if (
  user &&
  !pendingSignup
) {

  requestAnimationFrame(() => {

  setScreen(
    "home"
  );

  setTimeout(() => {

    setAuthChecked(
      true
    );

    setAppReady(
      true
    );

  }, 0);

});

} else {

  requestAnimationFrame(() => {

  setScreen(
    "welcome"
  );

  setTimeout(() => {

    setAuthChecked(
      true
    );

    setAppReady(
      true
    );

  }, 0);

});

}

          

        }
      );

    return () =>
      unsubscribe();

  }, []);

  useEffect(() => {

    if (
      screen !==
        "loading" &&
      screen !==
        "signup" &&
      screen !==
        "otp" &&
      screen !==
        "completeProfile"
    ) {

      localStorage.setItem(
        "vibeLinkScreen",
        screen
      );

    }

  }, [screen]);

  if (
  !authChecked ||
  !screen ||
  !appReady
) {

    return (

      <div className="w-screen h-screen bg-black flex items-center justify-center text-white text-2xl font-black">

        Vibe Link...

      </div>

    );

  }

  if (
    screen ===
    "welcome"
  ) {

    return (
      <Welcome
        setScreen={
          setScreen
        }
      />
    );

  }

  
  if (
    screen ===
    "forgotPassword"
  ) {

    return (

      <ForgotPassword
        setScreen={
          setScreen
        }
      />

    );

  }

  if (
  screen ===
  "auth"
) {

  return (

    <Auth

      setScreen={
        setScreen
      }

      isLogin={
        screen === "auth"
      }

      setIsLogin={(value) => {

        if (value) {

          setScreen("auth");

        } else {

          setScreen("authSignup");

        }

      }}

      username={
        username
      }

      setUsername={
        setUsername
      }

      email={
        email
      }

      setEmail={
        setEmail
      }

      password={
        password
      }

      setPassword={
        setPassword
      }

      age={
        age
      }

      setAge={
        setAge
      }

      phone={
        phone
      }

      setPhone={
        setPhone
      }

      showPassword={
        showPassword
      }

      setShowPassword={
        setShowPassword
      }

      loginUser={async () => {

        setScreen(
          "loginSuccess"
        );

      }}

      sendOtp={async () => {

  try {

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
    "EMAILJS ERROR:",
    error
  );

  alert(
    JSON.stringify(error)
  );

}

}}

    />

  );

}

if (
  screen ===
  "authSignup"
) {

  return (

    <Auth

      setScreen={
        setScreen
      }

      isLogin={false}

      setIsLogin={(value) => {

        if (value) {

          setScreen("auth");

        } else {

          setScreen("authSignup");

        }

      }}

      username={
        username
      }

      setUsername={
        setUsername
      }

      email={
        email
      }

      setEmail={
        setEmail
      }

      password={
        password
      }

      setPassword={
        setPassword
      }

      age={
        age
      }

      setAge={
        setAge
      }

      phone={
        phone
      }

      setPhone={
        setPhone
      }

      showPassword={
        showPassword
      }

      setShowPassword={
        setShowPassword
      }

      loginUser={async () => {

        setScreen(
          "loginSuccess"
        );

      }}

      sendOtp={async () => {

        setScreen(
          "otp"
        );

      }}

    />

  );

}

  if (
    screen ===
    "completeProfile"
  ) {

    return (

      <CompleteProfile
        setScreen={
          setScreen
        }

        email={email}

        password={
          password
        }

        setPassword={
          setPassword
        }

        showPassword={
          showPassword
        }

        setShowPassword={
          setShowPassword
        }

        setGeneratedOtp={
          setGeneratedOtp
        }

        phone={phone}

        setPhone={
          setPhone
        }

        age={age}

        setAge={
          setAge
        }

        gender={
          gender
        }

        setGender={
          setGender
        }

        country={
          country
        }

        setCountry={
          setCountry
        }

        bio={bio}

        setBio={
          setBio
        }
      />

    );

  }

  if (
    screen ===
    "otp"
  ) {

    return (

      <OTP
        email={email}

        password={
          password
        }

        username={
          username
        }

        phone={phone}

        age={age}

        gender={
          gender
        }

        country={
          country
        }

        bio={bio}

        generatedOtp={
          generatedOtp
        }

        setGeneratedOtp={
          setGeneratedOtp
        }

        isGoogleSignup={
          isGoogleSignup
        }

        setScreen={
          setScreen
        }
      />

    );

  }

  if (
    screen ===
    "signupSuccess"
  ) {

    return (
      <SignupSuccess
        setScreen={
          setScreen
        }
      />
    );

  }

  if (
    screen ===
    "loginSuccess"
  ) {

    return (
      <LoginSuccess
        setScreen={
          setScreen
        }
      />
    );

  }

  if (
    screen ===
    "profilePicture"
  ) {

    return (
      <ProfilePicture
        setScreen={
          setScreen
        }
      />
    );

  }

  if (
    screen ===
    "discover"
  ) {

    return (

      <Discover
        selectedVibes={
          selectedVibes
        }

        setScreen={
          setScreen
        }
      />

    );

  }

  if (
    screen ===
    "vibes"
  ) {

    return (

      <Vibes
        setScreen={
          setScreen
        }

        selectedVibes={
          selectedVibes
        }

        setSelectedVibes={
          setSelectedVibes
        }
      />

    );

  }

  if (
    screen ===
    "home"
  ) {

    return (
      <Home />
    );

  }

  if (
  screen ===
  "terms"
) {

  return (

    <Terms
      setScreen={
        setScreen
      }
    />

  );

}

if (
  screen ===
  "privacy"
) {

  return (

    <Privacy
      setScreen={
        setScreen
      }
    />

  );

}

  return null;

}