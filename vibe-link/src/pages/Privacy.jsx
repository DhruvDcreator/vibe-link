import { motion } from "framer-motion";

export default function Terms({
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

          TERMS & CONDITIONS

        </h1>

        <div className="space-y-6 text-zinc-300 leading-relaxed">

          <p>
            By using Vibe Link™, you agree to comply with all platform rules and applicable laws.
          </p>

          <p>
            Users must be at least 13 years old to create and use an account.
          </p>

          <p>
            You are responsible for all activity conducted through your account.
          </p>

          <p>
            Harassment, bullying, impersonation, hate speech, illegal content, spam, or abusive behavior is strictly prohibited.
          </p>

          <p>
            Vibe Link reserves the right to suspend or terminate accounts violating platform policies.
          </p>

          <p>
            Users may not attempt unauthorized access, exploit bugs, or interfere with platform security.
          </p>

          <p>
            Features, policies, and services may change over time without prior notice.
          </p>

          <p>
            Vibe Link™ is provided “as is” without warranties of uninterrupted availability.
          </p>

          <p>
            By continuing to use Vibe Link™, you consent to these Terms & Conditions.
          </p>

        </div>

        <p className="text-xs text-zinc-600 text-center pt-14">

          © 2026 Vibe Link™ — Dhruv Dhanuka. All rights reserved.

        </p>

      </motion.div>

    </div>

  );

}