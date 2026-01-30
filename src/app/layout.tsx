import { ThemeProvider } from "@/components/theme-provider";
import ClickSpark from "@/components/ui/click-spark";
import ExposureFontLoader from "@/components/ui/exposure-font-loader";
import LightRays from "@/components/ui/light-rays";
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
  title: "Nathan Schroeder",
  description: "Software Developer, UI/UX Designer",
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
      </body>
    </html>
  );
}
