import "~/styles/globals.css";

import { type Metadata } from "next";
import { geist, ibmPlexSansArabic } from "~/lib/fonts";

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
    <html suppressHydrationWarning className={`${geist.variable} ${ibmPlexSansArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
