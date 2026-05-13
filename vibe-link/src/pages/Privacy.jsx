import { motion } from "framer-motion";

export default function Privacy({
  setScreen,
}) {

  return (

    <div className="min-h-screen h-screen bg-black text-white p-6 overflow-y-auto relative overflow-hidden">

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
              Effective Date: May 13, 2026
            </p>

            <p>
              Last Updated: May 13, 2026
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

              At Vibe Link™, we value user privacy, safety, transparency, and trust. This Privacy Policy explains how we collect, use, store, process, protect, and share information when you use the Vibe Link™ platform, website, mobile applications, anonymous chat systems, and related services.

            </p>

            <p>

              By creating an account or using Vibe Link™, you agree to the practices described in this Privacy Policy.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              1. Information We Collect

            </h2>

            <p className="mb-4">

              The information we collect depends on how you use Vibe Link™ and which features you interact with.

            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Username</li>
              <li>Email address</li>
              <li>Password</li>
              <li>Date of birth</li>
              <li>Age confirmation</li>
              <li>Country or region</li>
              <li>Gender (optional)</li>
              <li>Profile photo</li>
              <li>Biography/about information</li>
              <li>Messages, chats, reactions, and shared content</li>
              <li>Reports, feedback, and support requests</li>
              <li>Vibe selections and room participation</li>
              <li>Friend requests and connection activity</li>
              <li>Device type and operating system</li>
              <li>Browser information</li>
              <li>IP address</li>
              <li>Session activity</li>
              <li>Device identifiers</li>
              <li>Login timestamps</li>
              <li>Crash logs and diagnostics</li>

            </ul>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              2. How We Use Your Information

            </h2>

            <ul className="list-disc pl-6 space-y-2">

              <li>Create and maintain accounts</li>
              <li>Provide anonymous matching and chat systems</li>
              <li>Personalize user experiences</li>
              <li>Improve discoverability and matching quality</li>
              <li>Maintain streaks, games, points, and rewards</li>
              <li>Prevent fraud, abuse, spam, scams, and harmful activity</li>
              <li>Improve platform stability and reliability</li>
              <li>Provide customer support</li>
              <li>Send service-related notifications</li>
              <li>Enforce our Terms & Conditions</li>
              <li>Develop future platform features</li>

            </ul>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              3. Anonymous Conversations

            </h2>

            <p>

              Vibe Link™ may include anonymous conversation systems where users interact without immediately revealing identities.

            </p>

            <p>

              While chats may appear anonymous to users, platform systems may still retain moderation-related and technical information for safety, legal, and operational purposes.

            </p>

            <p>

              Users remain responsible for their conduct while using anonymous features.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              4. Age Restrictions

            </h2>

            <p>

              Vibe Link™ is intended only for users aged 13 years or older.

            </p>

            <p>

              We may use automated systems, date-of-birth verification, and manual review processes to help maintain platform safety and enforce eligibility requirements.

            </p>

            <p>

              Accounts violating age requirements may be restricted, suspended, disabled, or temporarily locked.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              5. Safety, Moderation & Integrity

            </h2>

            <p>

              To maintain platform safety, Vibe Link™ may investigate reports, detect suspicious behavior, restrict harmful activity, remove abusive content, and enforce platform policies using automated systems and, in certain situations, limited human review.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              6. Sharing of Information

            </h2>

            <p>

              We do not sell users’ personal information.

            </p>

            <p>

              However, Vibe Link™ may share limited information when reasonably necessary to:

            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Comply with applicable laws or legal obligations</li>
              <li>Respond to valid legal requests</li>
              <li>Cooperate with law enforcement agencies, cybercrime units, courts, or government authorities</li>
              <li>Investigate fraud, abuse, scams, or illegal activities</li>
              <li>Protect the safety, users, employees, or platform integrity of Vibe Link™</li>
              <li>Prevent harm or security threats</li>
              <li>Work with trusted service providers, hosting providers, analytics providers, payment systems, or moderation tools</li>

            </ul>

            <p>

              Information shared will be limited to what is reasonably necessary under the circumstances.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              7. Third-Party Services

            </h2>

            <p>

              Vibe Link™ may use trusted third-party services including Firebase, Google services, analytics providers, cloud hosting providers, payment processors, authentication systems, moderation tools, and related technologies necessary for platform functionality.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              8. Cookies & Similar Technologies

            </h2>

            <p>

              Vibe Link™ may use cookies and similar technologies to maintain sessions, remember preferences, improve security, analyze traffic, and personalize experiences.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              9. Data Retention

            </h2>

            <p>

              We retain information only as long as reasonably necessary for operational, legal, moderation, safety, and platform integrity purposes.

            </p>

            <p>

              Deleted accounts or content may remain temporarily in backups or security systems for operational reasons.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              10. International Processing

            </h2>

            <p>

              Your information may be stored or processed in countries outside your jurisdiction where our infrastructure, providers, or partners operate.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              11. Your Rights & Choices

            </h2>

            <p>

              Depending on your location and applicable laws, you may have rights to access, update, manage, export, or request deletion of certain information associated with your account.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              12. Policy Updates

            </h2>

            <p>

              We may update this Privacy Policy periodically to reflect platform improvements, legal requirements, safety updates, or operational changes.

            </p>

            <p>

              Continued use of Vibe Link™ after updates means you accept the revised policy.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              13. Contact Information

            </h2>

            <p>

              For support, privacy concerns, or legal inquiries:

            </p>

            <p className="text-cyan-300 font-semibold">

              teamvibelink@gmail.com

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              14. Consent

            </h2>

            <p>

              By using Vibe Link™, creating an account, or accessing its services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.

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