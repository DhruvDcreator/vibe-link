import { motion } from "framer-motion";

export default function Privacy({
  setScreen,
}) {

  return (

    <div className="min-h-screen bg-black text-white p-6 overflow-y-auto relative overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      {/* glowing blobs */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] top-[-150px] left-[-100px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-100px]"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 max-w-5xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-[0_0_60px_rgba(0,255,255,0.12)]"
      >

        {/* back button */}
        <motion.button
          whileHover={{
            scale: 1.15,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          onClick={() =>
            setScreen(
              "signup"
            )
          }
          className="absolute top-6 left-6 text-4xl text-cyan-400 cursor-pointer select-none"
        >

          ←

        </motion.button>

        {/* title */}
        <h1 className="text-5xl md:text-6xl font-black mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          PRIVACY POLICY

        </h1>

        <div className="space-y-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              Effective Date
            </h2>

            <p>
              Effective Date: January 1, 2026
            </p>

            <p>
              Last Updated: January 1, 2026
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              Introduction
            </h2>

            <p>
              Welcome to Vibe Link™.
            </p>

            <p>
              Your privacy matters to us. This Privacy Policy explains how Vibe Link™ collects, uses, stores, protects, and shares information when you use our platform, website, applications, and related services.
            </p>

            <p>
              By using Vibe Link™, you agree to the practices described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              1. Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Username</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Password</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Country or region</li>
              <li>Profile photo</li>
              <li>Bio/about information</li>
              <li>Messages and uploaded content</li>
              <li>Reports or support requests</li>
              <li>Device information and browser data</li>
              <li>IP address and session activity</li>
              <li>Crash logs and diagnostics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              2. How We Use Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage accounts</li>
              <li>Provide platform functionality</li>
              <li>Improve performance and stability</li>
              <li>Personalize user experience</li>
              <li>Maintain platform safety</li>
              <li>Prevent fraud, spam, abuse, and illegal activity</li>
              <li>Respond to support requests</li>
              <li>Enforce Terms & Conditions</li>
              <li>Send important service notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              3. Age Restrictions
            </h2>

            <p>
              Vibe Link™ is intended only for users aged 13 years and older.
            </p>

            <p>
              Accounts violating age requirements may be restricted, suspended, or disabled.
            </p>

            <p>
              We may use automated or manual verification systems to maintain platform safety.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              4. Account Security
            </h2>

            <p>
              Users are responsible for maintaining the confidentiality of their login credentials.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Do not share passwords</li>
              <li>Do not attempt unauthorized access</li>
              <li>Do not exploit bugs or vulnerabilities</li>
              <li>Do not interfere with platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              5. Sharing of Information
            </h2>

            <p>
              We do not sell personal information to third parties.
            </p>

            <p>
              However, Vibe Link™ may disclose or share user information when reasonably necessary to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with applicable laws, regulations, legal processes, or governmental requests</li>
              <li>Cooperate with law enforcement agencies, cybercrime investigations, or public authorities</li>
              <li>Detect, investigate, or prevent fraud, illegal activity, security threats, or violations of our Terms & Conditions</li>
              <li>Protect the rights, safety, property, users, staff, or platform integrity of Vibe Link™</li>
              <li>Respond to emergency situations involving potential harm or threats</li>
              <li>Work with trusted third-party service providers required to operate the platform</li>
            </ul>

            <p>
              Information shared will be limited to what is reasonably necessary under the circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              6. Third-Party Services
            </h2>

            <p>
              Vibe Link™ may use trusted third-party services including Firebase, analytics providers, cloud hosting providers, email services, and authentication systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              7. Data Retention
            </h2>

            <p>
              We retain information only as long as reasonably necessary for operational, legal, security, and platform integrity purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              8. Safety & Moderation
            </h2>

            <p>
              To maintain a safe environment, Vibe Link™ may review reports, investigate suspicious activity, remove harmful content, and restrict accounts violating platform policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              9. Policy Changes
            </h2>

            <p>
              We may update this Privacy Policy periodically.
            </p>

            <p>
              Continued use of Vibe Link™ after updates means you accept the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              10. Contact Information
            </h2>

            <p>
              For support or privacy-related concerns:
            </p>

            <p className="text-cyan-300 font-semibold">
              teamvibelink@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              11. Consent
            </h2>

            <p>
              By creating an account or using Vibe Link™, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </p>
          </section>

        </div>

        {/* copyright */}
        <p className="pt-14 text-sm text-zinc-400 text-center tracking-wide leading-relaxed">

          © 2026 Vibe Link™ — Dhruv Dhanuka. All rights reserved.

        </p>

      </motion.div>

    </div>

  );

}