"use client";

import dynamic from "next/dynamic";

const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

export default function LightRaysWrapper() {
  return (
    <LightRays
      raysOrigin="top-center"
      raysSpeed={1}
      lightSpread={1}
      rayLength={1}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
    />
  );
}
