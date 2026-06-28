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