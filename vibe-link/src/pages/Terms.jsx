import { motion } from "framer-motion";

export default function Terms({
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

          TERMS & CONDITIONS

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

              1. Acceptance of Terms

            </h2>

            <p>

              By accessing or using Vibe Link™, you agree to comply with and be legally bound by these Terms & Conditions.

            </p>

            <p>

              If you do not agree to these terms, you must not use the platform.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              2. Eligibility

            </h2>

            <p>

              Users must be at least 13 years old to create or use a Vibe Link™ account.

            </p>

            <p>

              Providing false information regarding age or identity may result in account restriction, suspension, or permanent termination.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              3. User Accounts

            </h2>

            <p>

              Users are responsible for maintaining the confidentiality and security of their accounts and login credentials.

            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Do not share passwords</li>

              <li>Do not impersonate others</li>

              <li>Do not create misleading accounts</li>

              <li>Do not access accounts without authorization</li>

            </ul>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              4. Acceptable Use

            </h2>

            <p>

              Users agree not to use Vibe Link™ for illegal, abusive, harmful, or disruptive purposes.

            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Harassment or bullying</li>

              <li>Hate speech or violent threats</li>

              <li>Spam or scams</li>

              <li>Uploading illegal content</li>

              <li>Sharing malware or malicious links</li>

              <li>Attempting unauthorized access</li>

              <li>Exploiting bugs or vulnerabilities</li>

            </ul>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              5. Content Ownership

            </h2>

            <p>

              Users retain ownership of content they upload or create.

            </p>

            <p>

              By posting content on Vibe Link™, users grant the platform a non-exclusive license to host, display, and distribute such content solely for platform functionality and operations.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              6. Moderation & Enforcement

            </h2>

            <p>

              Vibe Link™ reserves the right to review, remove, restrict, or moderate content and accounts that violate these Terms & Conditions or threaten platform safety.

            </p>

            <p>

              Enforcement actions may occur without prior notice.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              7. Platform Availability

            </h2>

            <p>

              Vibe Link™ may update, modify, suspend, or discontinue features or services at any time without prior notice.

            </p>

            <p>

              We do not guarantee uninterrupted or error-free platform availability.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              8. Limitation of Liability

            </h2>

            <p>

              Vibe Link™ and its operators shall not be held liable for indirect, incidental, or consequential damages arising from the use or inability to use the platform.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              9. Legal Compliance

            </h2>

            <p>

              Vibe Link™ may cooperate with law enforcement agencies, cybercrime authorities, courts, or governmental bodies when required by law or when reasonably necessary to protect users, safety, or platform integrity.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              10. Changes to Terms

            </h2>

            <p>

              These Terms & Conditions may be updated periodically.

            </p>

            <p>

              Continued use of Vibe Link™ after updates means you accept the revised terms.

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              11. Contact Information

            </h2>

            <p>

              For support or legal concerns:

            </p>

            <p className="text-cyan-300 font-semibold">

              teamvibelink@gmail.com

            </p>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">

              12. Agreement

            </h2>

            <p>

              By creating an account or using Vibe Link™, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.

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