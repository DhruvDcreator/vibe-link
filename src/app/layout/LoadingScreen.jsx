import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#03040A] px-4 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        <Sparkles
          className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.45)]"
          size={42}
        />

        <div className="mt-6 h-3 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
        </div>
      </div>
    </div>
  );
}