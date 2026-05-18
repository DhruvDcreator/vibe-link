import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import Cropper from "react-easy-crop";

import getCroppedImg from "../utils/cropImage";

export default function ProfilePicture({
  setScreen,
}) {

  const [
    preview,
    setPreview,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
  image,
  setImage,
] = useState(null);

const [
  crop,
  setCrop,
] = useState({
  x: 0,
  y: 0,
});

const [
  zoom,
  setZoom,
] = useState(1);

const [
  croppedAreaPixels,
  setCroppedAreaPixels,
] = useState(null);

  const handleImage =
  (e) => {

    const file =
      e.target.files[0];

    if (!file) {

      return;

    }

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        setImage(
          reader.result
        );

      };

    reader.readAsDataURL(
      file
    );

  };

  const onCropComplete =
  (
    croppedArea,
    croppedAreaPixels
  ) => {

    setCroppedAreaPixels(
      croppedAreaPixels
    );

  };

  const saveImage =
  async () => {

    try {

      if (!image) {

        alert(
          "Please select an image"
        );

        return;

      }

      setLoading(true);

      const croppedImage =
        await getCroppedImg(
          image,
          croppedAreaPixels
        );

      const user =
        auth.currentUser;

      if (!user) {

        alert(
          "No user found"
        );

        return;

      }

      await updateDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          profilePic:
            croppedImage,
        }
      );

      setPreview(
        croppedImage
      );

      setScreen(
        "introSlides"
      );

    } catch (error) {

      console.log(
        error
      );

      alert(
        "Failed to save image"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

  <div className="
    relative
    min-h-screen
    overflow-hidden
    bg-[#03040A]
    flex
    items-center
    justify-center
    text-white
    px-6
  ">

    {/* BACKGROUND */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]"></div>

    {/* GLOWS */}
    <div className="
      absolute
      top-[10%]
      left-[5%]
      w-[320px]
      h-[320px]
      bg-cyan-500/10
      rounded-full
      blur-[120px]
    "></div>

    <div className="
      absolute
      bottom-[10%]
      right-[5%]
      w-[320px]
      h-[320px]
      bg-purple-500/10
      rounded-full
      blur-[120px]
    "></div>

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
      "
    >

      {/* CARD */}
      <div className="
        bg-white/[0.035]
        border
        border-white/10
        rounded-[36px]
        p-7
        backdrop-blur-3xl
        shadow-[0_0_80px_rgba(0,212,255,0.06)]
      ">

        {/* TITLE */}
        <div className="text-center">

          <motion.h1

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
              text-5xl
              font-black
              leading-tight
            "
          >

            Create Your

            <br />

            <span className="
              bg-gradient-to-r
              from-cyan-300
              via-purple-300
              to-pink-300
              text-transparent
              bg-clip-text
            ">

              Identity

            </span>

          </motion.h1>

          <p className="
            mt-4
            text-zinc-400
            text-[15px]
            leading-relaxed
          ">

            Add a profile picture

            <br />

            to personalize your vibe.

          </p>

        </div>

        {/* IMAGE SECTION */}
        <div className="
          mt-10
          flex
          flex-col
          items-center
        ">

          {

            image ? (

              <div className="
                relative
                w-[250px]
                h-[250px]
                rounded-full
                overflow-hidden

                border-[4px]
                border-cyan-400/30

                shadow-[0_0_60px_rgba(0,212,255,0.16)]
              ">

                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />

              </div>

            ) : (

              <motion.label

                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.98,
                }}

                className="
                  relative
                  w-[230px]
                  h-[230px]
                  rounded-full

                  flex
                  items-center
                  justify-center

                  overflow-hidden
                  cursor-pointer

                  bg-white/[0.04]

                  border-[4px]
                  border-dashed
                  border-cyan-400/25

                  backdrop-blur-2xl

                  shadow-[0_0_50px_rgba(0,212,255,0.08)]
                "
              >

                {/* inner glow */}
                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-cyan-500/10
                  to-purple-500/10
                "></div>

                <div className="
                  relative
                  z-10
                  text-center
                ">

                  <div className="text-7xl">

                    ✨

                  </div>

                  <p className="
                    mt-3
                    text-zinc-300
                    tracking-wide
                  ">

                    Upload Photo

                  </p>

                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />

              </motion.label>

            )

          }

          {/* ZOOM */}
          {

            image && (

              <>

                <div className="
                  mt-8
                  w-full
                ">

                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) =>
                      setZoom(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      accent-cyan-400
                      cursor-pointer
                    "
                  />

                </div>

                {/* CHANGE PHOTO */}
                <label className="
                  mt-5
                  w-full
                  cursor-pointer
                ">

                  <div className="
                    py-4
                    rounded-[22px]

                    bg-white/[0.04]

                    border
                    border-white/10

                    text-zinc-300
                    text-center

                    hover:bg-white/[0.06]

                    transition-all
                    duration-300
                  ">

                    Change Photo

                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImage}
                  />

                </label>

              </>

            )

          }

        </div>

        {/* BUTTONS */}
        <div className="
          mt-10
          space-y-4
        ">

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

            onClick={saveImage}

            disabled={loading}

            className={`
              w-full
              py-5
              rounded-[24px]

              text-sm
              tracking-[0.28em]
              font-semibold

              transition-all
              duration-300

              ${
                loading

                  ? "bg-zinc-700 opacity-70"

                  : "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 text-white shadow-[0_0_60px_rgba(168,85,247,0.35)] hover:shadow-[0_0_90px_rgba(168,85,247,0.5)]"
              }
            `}
          >

            {

              loading
                ? "SAVING..."
                : "CONTINUE"

            }

          </motion.button>

          <button

            onClick={() =>
              setScreen(
                "introSlides"
              )
            }

            className="
              w-full
              py-4
              rounded-[22px]

              bg-white/[0.04]

              border
              border-white/10

              text-zinc-300

              hover:bg-white/[0.06]

              transition-all
              duration-300
            "
          >

            Skip For Now

          </button>

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

      </p>

    </motion.div>

  </div>

);
}