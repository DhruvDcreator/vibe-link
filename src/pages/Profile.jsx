import {
  useRef,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  signOut,
} from "firebase/auth";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

import Cropper from "react-easy-crop";

import getCroppedImg from "../utils/cropImage";

export default function Profile({

  userData,

  setCurrentTab,

}) {

  const fileInputRef =
    useRef(null);

  const [editing,
    setEditing] =
    useState(false);

  const [bio,
    setBio] =
    useState(
      userData?.bio || ""
    );

  const [phone,
    setPhone] =
    useState(
      userData?.phone || ""
    );

  const [profilePic,
    setProfilePic] =
    useState(
      userData?.profilePic || ""
    );

  const [loading,
    setLoading] =
    useState(false);

  const [selectedImage,
  setSelectedImage] =
  useState(null);

const [crop,
  setCrop] =
  useState({
    x: 0,
    y: 0,
  });

const [zoom,
  setZoom] =
  useState(1);

const [croppedAreaPixels,
  setCroppedAreaPixels] =
  useState(null);

const [showCropper,
  setShowCropper] =
  useState(false);

  const calculateAge =
    (dob) => {

      if (!dob) {
        return userData?.age;
      }

      const birthDate =
        new Date(dob);

      const today =
        new Date();

      let age =
        today.getFullYear() -
        birthDate.getFullYear();

      const monthDiff =
        today.getMonth() -
        birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (
          monthDiff === 0 &&
          today.getDate() <
          birthDate.getDate()
        )
      ) {

        age--;

      }

      return age;

    };

  const age =
    calculateAge(
      userData?.dob
    );

  const saveProfile =
    async () => {

      try {

        setLoading(true);

        await updateDoc(
          doc(
            db,
            "users",
            auth.currentUser.uid
          ),
          {
            bio,
            phone,
            profilePic,
          }
        );

        alert(
          "Profile updated 😭🔥"
        );

        setEditing(false);

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to update profile"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleImageChange =
  (e) => {

    const file =
      e.target.files[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload =
      () => {

        setSelectedImage(
          reader.result
        );

        setShowCropper(
          true
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

  const cropImageNow =
  async () => {

    try {

      const croppedImage =
        await getCroppedImg(
          selectedImage,
          croppedAreaPixels
        );

      setProfilePic(
        croppedImage
      );

      await updateDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid
        ),
        {
          profilePic:
            croppedImage,
        }
      );

      setShowCropper(
        false
      );

    } catch (error) {

      console.log(
        error
      );

    }

  };

  const logout =
    async () => {

      try {

        await signOut(
          auth
        );

        window.location.reload();

      } catch (error) {

        console.log(
          error
        );

      }

    };

  return (

    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="px-4 pb-24 pt-6 min-h-screen bg-black text-white relative overflow-hidden"style={{
  paddingTop: "env(safe-area-inset-top)"
}}
    >

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      {/* glowing blobs */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] top-[-150px] left-[-120px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] bottom-[-150px] right-[-120px]"></div>

      {/* card */}
      <div className="relative z-10 max-w-sm mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[36px] p-6 shadow-[0_0_50px_rgba(0,255,255,0.12)]">

        {/* profile pic */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400/40 mx-auto shadow-[0_0_50px_rgba(0,255,255,0.25)]">

          <img
            src={
              profilePic ||
              "https://ui-avatars.com/api/?name=Vibe+Link&background=0f172a&color=22d3ee&size=256"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />

        </div>

        {/* change photo */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            fileInputRef.current.click()
          }
          className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 py-3 rounded-2xl font-bold cursor-pointer transition-all duration-300"
        >

          CHANGE PHOTO

        </motion.button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={
            handleImageChange
          }
          className="hidden"
        />

        {/* username */}
        <h1 className="text-3xl font-black text-center mt-6 break-words">

          @{userData?.username || "username"}

        </h1>

        {/* age country */}
        <p className="text-zinc-400 text-center mt-3">

          {age || "18"} • {userData?.country || "India"}

        </p>

        {/* phone */}
        <div className="mt-5">

          <p className="text-zinc-400 text-sm mb-2">

            Phone

          </p>

          <input
            type="tel"
            value={phone}
            disabled={!editing}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 disabled:opacity-70"
          />

        </div>

        {/* bio */}
        <div className="mt-5">

          <p className="text-zinc-400 text-sm mb-2">

            Bio

          </p>

          <textarea
            value={bio}
            disabled={!editing}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
            rows={4}
            className="w-full resize-none bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 disabled:opacity-70"
          />

        </div>

        {/* vibes */}
        <div className="flex flex-wrap gap-2 justify-center mt-5">

          {userData?.vibes?.length > 0 ? (

            userData.vibes.map(
              (vibe) => (

                <div
                  key={vibe}
                  className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm backdrop-blur-xl"
                >

                  {vibe}

                </div>

              )
            )

          ) : (

            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm">

              No vibes yet

            </div>

          )}

        </div>

        {/* points */}
        <div className="mt-6 flex items-center justify-center">

          <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 text-center">

            <p className="text-zinc-400 text-sm">

              Points

            </p>

            <h2 className="text-2xl font-black text-cyan-300">

              {userData?.points || 0}

            </h2>

          </div>

        </div>

        {/* buttons */}
        {!editing ? (

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() =>
              setEditing(true)
            }
            className="w-full mt-7 bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-[0_0_35px_rgba(0,255,255,0.25)] hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]"
          >

            EDIT PROFILE

          </motion.button>

        ) : (

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={saveProfile}
            disabled={loading}
            className="w-full mt-7 bg-gradient-to-r from-green-500 to-cyan-500 py-4 rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-[0_0_35px_rgba(0,255,255,0.25)] disabled:opacity-60"
          >

            {loading
              ? "SAVING..."
              : "SAVE PROFILE"}

          </motion.button>

        )}

        {/* edit vibes */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            setCurrentTab(
              "editVibes"
            )
          }
          className="w-full mt-4 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold cursor-pointer hover:bg-white/10 transition-all duration-300"
        >

          EDIT VIBES

        </motion.button>

        {/* logout */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={logout}
          className="w-full mt-4 bg-red-500/10 border border-red-500/20 py-4 rounded-2xl font-bold cursor-pointer hover:bg-red-500/20 transition-all duration-300 text-red-300"
        >

          LOGOUT

        </motion.button>

        {showCropper && (

  <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-5"
  >

    <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-5 shadow-[0_0_60px_rgba(0,255,255,0.12)]">

      <h1 className="text-3xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

        CROP PHOTO

      </h1>

      <p className="text-zinc-400 text-center text-sm mt-2 leading-relaxed">

        Adjust your profile picture

      </p>

      <div className="relative w-full h-[380px] mt-6 rounded-[32px] overflow-hidden bg-black border border-white/10">

        <Cropper
  image={selectedImage}
  crop={crop}
  zoom={zoom}
  aspect={1}
  cropShape="round"
  showGrid={false}
  restrictPosition={true}
  zoomSpeed={0.15}
  objectFit="horizontal-cover"
  onCropChange={setCrop}
  onZoomChange={setZoom}
  onCropComplete={onCropComplete}
/>

      </div>

      <div className="mt-6">

        <p className="text-sm text-zinc-400 mb-3">

          Zoom

        </p>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) =>
            setZoom(
              Number(
                e.target.value
              )
            )
          }
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600"
        />

      </div>

      <div className="flex gap-4 mt-7">

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            setShowCropper(
              false
            )
          }
          className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold cursor-pointer hover:bg-white/10 transition-all duration-300"
        >

          CANCEL

        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={cropImageNow}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold cursor-pointer shadow-[0_0_40px_rgba(0,255,255,0.25)] hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-all duration-300"
        >

          SAVE

        </motion.button>

      </div>

    </div>

  </motion.div>

)}

        {/* copyright */}
        <p className="pt-6 text-sm text-zinc-400 text-center tracking-wide leading-relaxed">

          © 2026 Vibe Link™ — Dhruv Dhanuka. All rights reserved.

        </p>

      </div>

    </motion.div>

  );

}