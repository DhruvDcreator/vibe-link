import Welcome from "../pages/Welcome";
import Auth from "../pages/Auth";
import OTP from "../pages/OTP";
import SignupSuccess from "../pages/SignupSuccess";
import LoginSuccess from "../pages/LoginSuccess";
import CompleteProfile from "../pages/CompleteProfile";
import ProfilePicture from "../pages/ProfilePicture";
import ForgotPassword from "../pages/ForgotPassword";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import IntroSlides from "../pages/IntroSlides";
import Selector from "../pages/Selector";
import VibeIntro from "../pages/VibeIntro";

export default function AuthRouter({
  screen,
  setScreen,
}) {
  if (screen === "welcome") {
    return <Welcome setScreen={setScreen} />;
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

  return null;
}