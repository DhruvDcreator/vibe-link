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

import LoginOrSignup from "./pages/LoginOrSignup";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import OTP from "./pages/OTP";

import SignupSuccess from "./pages/SignupSuccess";

import LoginSuccess from "./pages/LoginSuccess";

import Vibes from "./pages/Vibes";

import CompleteProfile from "./pages/CompleteProfile";

import ProfilePicture from "./pages/ProfilePicture";

import Discover from "./pages/Discover";

import Home from "./pages/Home";

import ForgotPassword from "./pages/ForgotPassword";

export default function App() {

  const [screen, setScreen] =
    useState("loading");

  const [
    authChecked,
    setAuthChecked,
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

            setScreen(
              "home"
            );

          } else {

            setScreen(
              "welcome"
            );

          }

          setAuthChecked(
            true
          );

        }
      );

    return () =>
      unsubscribe();

  }, []);

  useEffect(() => {

    const savedScreen =
      localStorage.getItem(
        "vibeLinkScreen"
      );

    if (
      savedScreen &&
      savedScreen !==
        "loading"
    ) {

      setScreen(
        savedScreen
      );

    }

  }, []);

  useEffect(() => {

    if (
      screen !==
      "loading"
    ) {

      localStorage.setItem(
        "vibeLinkScreen",
        screen
      );

    }

  }, [screen]);

  if (
    !authChecked
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
    "loginOrSignup"
  ) {

    return (
      <LoginOrSignup
        setScreen={
          setScreen
        }
      />
    );

  }

  if (
    screen ===
    "login"
  ) {

    return (

      <Login
        setScreen={
          setScreen
        }

        username={
          username
        }

        setUsername={
          setUsername
        }

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
    "signup"
  ) {

    return (

      <Signup
        setScreen={
          setScreen
        }

        username={
          username
        }

        setUsername={
          setUsername
        }

        email={email}

        setEmail={
          setEmail
        }

        password={
          password
        }

        setPassword={
          setPassword
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

        setGeneratedOtp={
          setGeneratedOtp
        }

        showPassword={
          showPassword
        }

        setShowPassword={
          setShowPassword
        }

        setIsGoogleSignup={
          setIsGoogleSignup
        }
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

        isGoogleSignup={
          isGoogleSignup
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

  return null;

}