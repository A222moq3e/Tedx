import { setRequestLocale } from "next-intl/server";
import { type Locale } from "~/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
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
