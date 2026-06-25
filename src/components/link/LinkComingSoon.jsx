return (
  <div className="mt-9 space-y-6">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.05]
      p-7
      backdrop-blur-2xl
      "
    >
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px]" />

      <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-[70px]" />

      <div className="relative z-10">

        <p className="
        text-xs
        font-black
        tracking-[0.25em]
        text-cyan-300
        ">
          COMING SOON
        </p>

        <h2 className="
        mt-4
        text-3xl
        font-black
        ">
          LINK is Under Development
        </h2>

        <p className="
        mt-4
        text-zinc-400
        leading-relaxed
        ">
          We're building the future of
          networking, collaboration,
          opportunities and professional
          connections.
        </p>

      </div>
    </motion.div>
    <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="
  rounded-[30px]
  border
  border-white/10
  bg-white/[0.05]
  p-6
  "
>
  <h3 className="text-lg font-black">
    Planned Features
  </h3>

  <div className="mt-5 space-y-4 text-zinc-300">

    <div>✓ Professional Profiles</div>

    <div>✓ Networking</div>

    <div>✓ Projects</div>

    <div>✓ Collaboration</div>

    <div>✓ Mentorship</div>

    <div>✓ Opportunities</div>

  </div>
</motion.div>
{age < 17 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="
    rounded-[30px]
    border
    border-cyan-400/15
    bg-cyan-500/10
    p-6
    "
  >
    <p className="
    text-cyan-300
    font-black
    ">
      17+ PROFESSIONAL SECTION
    </p>

    <p className="
    mt-4
    text-zinc-300
    leading-relaxed
    ">
      LINK is designed for
      networking, professional
      opportunities and collaboration.

      This section is intended for
      users aged 17 and above.

      It is currently under
      development and will launch
      in a future update.
    </p>
  </motion.div>
)}
</div>
);