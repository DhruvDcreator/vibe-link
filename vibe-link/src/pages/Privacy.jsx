import { motion } from "framer-motion";

export default function Privacy({
  setScreen,
}) {

  return (

    <div className="min-h-screen bg-black text-white p-6 overflow-y-auto">

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="max-w-4xl mx-auto"
      >

        <button
          onClick={() =>
            setScreen(
              "signup"
            )
          }
          className="text-cyan-400 text-3xl mb-6"
        >

          ←

        </button>

        <h1 className="text-5xl font-black mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          PRIVACY POLICY

        </h1>

        <div className="space-y-6 text-zinc-300 leading-relaxed">

          <p>
            Vibe Link™ values your privacy and aims to protect your personal information.
          </p>

          <p>
            We may collect information such as username, email, profile information, and usage activity to provide and improve the platform.
          </p>

          <p>
            Your information is stored securely using trusted third-party services such as Firebase.
          </p>

          <p>
            We do not sell your personal information to third parties.
          </p>

          <p>
            Users are responsible for the information they choose to publicly share on the platform.
          </p>

          <p>
            We may use analytics, security systems, and moderation tools to maintain platform safety.
          </p>

          <p>
            Accounts violating platform policies may be restricted or removed.
          </p>

          <p>
            By using Vibe Link™, you consent to this Privacy Policy.
          </p>

        </div>

        <p className="text-xs text-zinc-600 text-center pt-14">

          © 2026 Vibe Link™ — Dhruv Dhanuka. All rights reserved.

        </p>

      </motion.div>

    </div>

  );

}