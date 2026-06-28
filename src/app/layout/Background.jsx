export default function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />

      <div className="pointer-events-none fixed -left-32 -top-24 h-[340px] w-[340px] rounded-full bg-cyan-500/15 blur-[110px]" />

      <div className="pointer-events-none fixed -bottom-28 -right-20 h-[360px] w-[360px] rounded-full bg-purple-500/15 blur-[120px]" />
    </>
  );
}