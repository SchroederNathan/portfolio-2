import { ThemeProvider } from "@/components/theme-provider";
import ExposureFontLoader from "@/components/ui/exposure-font-loader";
import LightRays from "@/components/ui/light-rays";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./exposure-fonts.css";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const exposure = localFont({
  src: [
    {
      path: "../../public/fonts/exposure/ExposureTrial[0].otf",
      style: "normal",
    },
    {
      path: "../../public/fonts/exposure/ExposureItalicTrial[0].otf",
      style: "italic",
    },
  ],
  variable: "--font-exposure",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nathanschroeder.dev"),
  title: {
    default: "Nathan Schroeder — Software Developer & UI/UX Designer",
    template: "%s — Nathan Schroeder",
  },
  description:
    "Software developer and UI/UX designer specializing in React Native and Next.js. Building apps like Movati (130K+ users), FocusGrid, and ThemeGen.",
  authors: [{ name: "Nathan Schroeder" }],
  openGraph: {
    title: "Nathan Schroeder — Software Developer & UI/UX Designer",
    description:
      "Software developer and UI/UX designer specializing in React Native and Next.js.",
    url: "https://nathanschroeder.dev",
    siteName: "Nathan Schroeder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Schroeder — Software Developer & UI/UX Designer",
    description:
      "Software developer and UI/UX designer specializing in React Native and Next.js.",
    creator: "@nater02",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${satoshi.variable} ${exposure.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nathan Schroeder",
              url: "https://nathanschroeder.dev",
              jobTitle: "Software Developer",
              knowsAbout: [
                "React Native",
                "Next.js",
                "UI/UX Design",
                "TypeScript",
              ],
              sameAs: [
                "https://github.com/SchroederNathan",
                "https://www.linkedin.com/in/nathan-schroeder-a40aa2210/",
                "https://x.com/nater02",
                "https://www.instagram.com/nathanschroederr/",
              ],
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ExposureFontLoader />

          <div className="fixed inset-0 pointer-events-none z-0">
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
          </div>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
