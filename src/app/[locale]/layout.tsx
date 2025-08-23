import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, type Locale } from "~/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "~/components/theme-provider";

import Navigation from "~/components/Navigation";
import { Providers } from "~/components/providers";

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

  // Apply the appropriate font family based on locale
  const fontClass = locale === 'ar' ? 'font-arabic' : 'font-sans';

  return (
    <div className={fontClass}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navigation />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </ThemeProvider>
    </div>
  );
}
