import type { Metadata } from "next";
import localFont from "next/font/local";
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
      path: "../../public/fonts/exposure/ExposureTrialVAR.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/exposure/ExposureTrialVAR-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-exposure",

});

export const metadata: Metadata = {
  title: "Nathan Schroeder",
  description: "Software Developer, UI/UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${exposure.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
