import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
