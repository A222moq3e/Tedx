import localFont from "next/font/local";
import { Geist } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const ibmPlexSansArabic = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSansArabic-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansArabic-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansArabic-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});
