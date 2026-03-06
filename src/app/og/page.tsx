import LightRays from "@/components/ui/light-rays";

export default function OGPage() {
  return (
    <div
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        width: 1200,
        height: 630,
        background: "#0a0a0a",
        padding: 80,
      }}
    >
      {/* Actual god rays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LightRays
          raysOrigin="top-center"
          raysSpeed={0}
          lightSpread={1}
          rayLength={2}
          fadeDistance={1}
          saturation={1}
          followMouse={false}
          mouseInfluence={0}
          raysColor="#888898"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <h1
          className="font-exposure font-black text-white"
          style={{ fontSize: 72, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 16 }}
        >
          Nathan Schroeder
        </h1>
        <p
          className="font-sans text-white/50"
          style={{ fontSize: 28, marginBottom: 40 }}
        >
          developer, UI/UX designer
        </p>
        <p className="font-sans text-white/30" style={{ fontSize: 20 }}>
          nathanschroeder.dev
        </p>
      </div>
    </div>
  );
}
