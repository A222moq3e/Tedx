import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "TEDx Event Management",
  description: "Ideas Worth Spreading - TEDx Event Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
