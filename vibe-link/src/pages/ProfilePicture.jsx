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
        "vibes"
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
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[140px] top-[-150px] left-[-120px]"></div>

      <div className="absolute w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-120px]"></div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
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

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            PROFILE PHOTO
          </h1>

          <p className="text-zinc-400 mt-3">
            Add your identity to your vibe
          </p>

        </div>

        <div className="space-y-6">

  {image ? (

    <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/40">

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
      className="w-52 h-52 rounded-full border-4 border-cyan-400/40 flex items-center justify-center overflow-hidden mx-auto cursor-pointer bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.15)]"
    >

      <div className="text-center space-y-3">

        <div className="text-7xl">
          ✨
        </div>

        <p className="text-zinc-400 text-sm">
          Upload Photo
        </p>

      </div>

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={
          handleImage
        }
      />

    </motion.label>

  )}

  {image && (

  <>

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
      className="w-full"
    />

    <label className="block">

      <div className="mt-4 w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 cursor-pointer hover:bg-white/10 transition-all duration-300">
        Change Photo
      </div>

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={
          handleImage
        }
      />

    </label>

  </>

)}

</div>

        <div className="space-y-4">

          <button
            onClick={
              saveImage
            }
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
          >
            {loading
              ? "SAVING..."
              : "CONTINUE"}
          </button>

          <button
            onClick={() =>
              setScreen(
                "vibes"
              )
            }
            className="w-full py-4 rounded-2xl font-semibold bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 transition-all duration-300"
          >
            Skip For Now
          </button>

        </div>

      </motion.div>

    </div>
  );
}