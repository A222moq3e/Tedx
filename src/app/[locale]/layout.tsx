import "~/styles/globals.css";

import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, type Locale } from "~/i18n/routing";
import { setRequestLocale } from "next-intl/server";

import { ThemeProvider } from "~/components/theme-provider";

import Navigation from "~/components/Navigation";
import { ibmPlexSansArabic } from "~/lib/fonts";

export const metadata: Metadata = {
  title: "TEDx Event Management",
  description: "Ideas Worth Spreading - TEDx Event Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={
        locale === "ar"
          ? `${ibmPlexSansArabic.variable} font-arabic`
          : "font-sans"
      }
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
