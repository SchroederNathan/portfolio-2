import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nathan Schroeder — Software Developer & UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,120,180,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#fafafa",
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: "-2px",
          }}
        >
          Nathan Schroeder
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#a1a1aa",
            marginBottom: 48,
          }}
        >
          Software Developer &amp; UI/UX Designer
        </div>

        {/* Tag line */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#71717a",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Building React Native &amp; Next.js apps · Movati · FocusGrid · ThemeGen
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 20,
            color: "#52525b",
          }}
        >
          nathanschroeder.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
