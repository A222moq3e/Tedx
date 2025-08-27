import { setRequestLocale } from "next-intl/server";
import { type Locale } from "~/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import DownloadIcsButton from "~/components/download-Ics-Button";

import { HeroSection } from "~/components/HeroSection";
import { FeaturesGrid } from "~/components/FeaturesGrid";
import { MapSection } from "~/components/MapSection";
import { EventDetails } from "~/components/EventDetails";

type Props = {
  params: Promise<{ locale: Locale }>;
};

function HomeContent() {
  "use client";
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Event Details */}
      <EventDetails />

      {/* Features Grid */}
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 mt-20 ${isArabic ? 'rtl' : 'ltr'}`}>
        <div className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="text-4xl">🎤</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("speakersTitle")}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t("speakersDescription")}
          </p>
        </div>
        <div className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="text-4xl">🎪</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("eventsTitle")}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t("eventsDescription")}
          </p>
        </div>
        <div className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="text-4xl">🌟</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("communityTitle")}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t("communityDescription")}
          </p>
        </div>
      </div>
      <FeaturesGrid />

      {/* Map Section */}
      <MapSection />

      {/* Call to Action */}
      <div
        className={`mt-12 space-y-4 text-center ${isArabic ? "rtl" : "ltr"}`}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("readyTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("readyDescription")}
        </p>
      </div>
    </>
  );
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="tedx-animated-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-gray-900 dark:text-white">
      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-white/20 dark:bg-black/40"></div>

      <div className="relative z-10 container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HomeContent />
      </div>
    </main>
  );
}
