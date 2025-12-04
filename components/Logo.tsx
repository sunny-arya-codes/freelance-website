export const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none group cursor-default">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-inner group-hover:border-blue-400/30 transition-colors">
        <span className="font-mono font-bold text-lg tracking-tighter text-white">SK</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-wide text-white">SUNNI KUMAR</span>
        <span className="text-[10px] uppercase tracking-widest text-blue-300/70">AI Engineering</span>
      </div>
    </div>
  );
};