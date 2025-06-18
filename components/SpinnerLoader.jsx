export default function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-20 h-20">
        {/* เรืองแสงรอบนอก */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-[#e0e0e0] to-[#bbbbbb] blur-[8px] opacity-60 animate-pulse"></div>

        {/* ตัว Spinner */}
        <div className="w-full h-full rounded-full border-4 border-t-white border-white/30 animate-spin shadow-[0_0_40px_rgba(255,255,255,0.8)] bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md"></div>
      </div>
    </div>
  );
}
