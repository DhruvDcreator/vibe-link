/*
import {
  useState,
  useEffect,
} from "react";

import {

  onAuthStateChanged,
  signInWithEmailAndPassword,

} from "firebase/auth";

import {
  auth,
  db,
} from "./firebase/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

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

import welcomeLogo from "./assets/vllogo.png";

import IntroSlides from "./pages/IntroSlides";

import Selector from "./pages/Selector";

import VibeIntro from "./pages/VibeIntro";

export default function App() {

  const [initializing, setInitializing] =
  useState(true);

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

  const loginUser =
  async () => {

    try {

      const usernameRef =
  doc(
    db,
    "usernames",
    username
      .trim()
      .toLowerCase()
  );

      const usernameSnap =
        await getDoc(
          usernameRef
        );

      if (
        !usernameSnap.exists()
      ) {

        alert(
          "Username not found"
        );

        return;

      }

      const userData =
        usernameSnap.data();

      const userEmail =
        userData.email;

      await signInWithEmailAndPassword(

        auth,

        userEmail,

        password

      );

      setScreen(
        "loginSuccess"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Invalid username or password"
      );

    }

  };

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,

        (user) => {

          setInitializing(false);

          const pendingSignup =
            localStorage.getItem(
              "pendingSignup"
            );

          if (
  user &&
  !pendingSignup
) {

  setScreen("home");

setAuthChecked(true);

setAppReady(true);

} else {

  if (!screen) {

  setScreen("welcome");

}

setAuthChecked(true);

setAppReady(true);

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
  initializing ||
  !authChecked ||
  !screen ||
  !appReady
) {

  return (

    <div className="
  w-screen
  h-screen
  bg-[#03040A]
  flex
  items-center
  justify-center
  overflow-hidden
  relative
">

  {/* glow *}/*
  <div className="
    absolute
    w-[300px]
    h-[300px]
    bg-cyan-500/10
    rounded-full
    blur-[120px]
  "></div>

  <div className="
    absolute
    w-[300px]
    h-[300px]
    bg-purple-500/10
    rounded-full
    blur-[120px]
  "></div>

  {/* logo *}/*
  <img
    src={welcomeLogo}
    alt="VibeLink"
    className="
      w-[120px]
      animate-pulse
      opacity-90
    "
  />

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

      loginUser={loginUser}

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

    console.log(
      "SENDING OTP..."
    );

    const response =
      await emailjs.send(

        "service_6xy30ia",

        "template_0dyw2wl",

        {

          to_email:
            email,

          otp:
            otp,

        },

        "agiLAySvLuJA74eKO"

      );

    console.log(
      "OTP SENT",
      response
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
      "Failed to send OTP"
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

      loginUser={loginUser}

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

    console.log(
      "SENDING OTP..."
    );

    const response =
      await emailjs.send(

        "service_6xy30ia",

        "template_0dyw2wl",

        {

          to_email:
            email,

          otp:
            otp,

        },

        "agiLAySvLuJA74eKO"

      );

    console.log(
      "OTP SENT",
      response
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
      "Failed to send OTP"
    );

  }

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
  "introSlides"
) {

  return (

    <IntroSlides
      setScreen={
        setScreen
      }
    />

  );

}

if (
  screen ===
  "selector"
) {

  return (

    <Selector
      setScreen={
        setScreen
      }
    />

  );

}

if (
  screen ===
  "vibeIntro"
) {

  return (

    <VibeIntro
      setScreen={setScreen}
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

  return (
  <div
    style={{
      background: "#03040A",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    }}
  >
    UNKNOWN SCREEN: {String(screen)}
  </div>
);

}
*/
import Welcome from "./pages/Welcome";
export default function App() {
  return <Welcome setScreen={() => {}} />;
}