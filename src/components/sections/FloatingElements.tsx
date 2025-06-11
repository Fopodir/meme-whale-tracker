
export default function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-glow-green/10 filter blur-[100px] animate-float"></div>
      <div
        className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-warm-yellow/10 filter blur-[120px] animate-float"
        style={{
          animationDelay: "5s",
        }}
      ></div>
      <div
        className="absolute top-[40%] right-[30%] w-48 h-48 rounded-full bg-purple-500/10 filter blur-[80px] animate-float"
        style={{
          animationDelay: "5s",
        }}
      ></div>
      <div
        className="absolute bottom-[30%] left-[15%] w-72 h-72 rounded-full bg-blue-500/10 filter blur-[90px] animate-float"
        style={{
          animationDelay: "5s",
        }}
      ></div>
    </div>
  );
}
