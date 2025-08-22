import { setRequestLocale } from "next-intl/server";
import { type Locale } from "~/i18n/routing";
import { Link } from "~/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import DownloadIcsButton from "~/components/download-Ics-Button";


type Props = {
  params: Promise<{ locale: Locale }>;
};

function HomeContent() {
  "use client";
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === 'ar';
  
  return (
    <>
      {/* Hero Section */}
      <div className="text-center space-y-6 min-h-[80vh] flex flex-col justify-center items-center">
        <Image
          src="/logos_svg/(1)-01.svg"
          alt={t("heroTitle")}
          width={400}
          height={400}
          className="w-96 h-96 sm:w-[28rem] sm:h-[28rem] object-contain"
          priority
        />
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex justify-center">
          <Link
            href="#agenda"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            {t("viewAgenda")}
          </Link>
        </div>
      </div>
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
      <DownloadIcsButton />

      {/* Map Section */}
      <div className={`flex flex-col gap-6 rounded-xl bg-gray-100/80 dark:bg-white/10 p-8 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors mt-12 max-w-2xl mx-auto text-center border border-gray-200 dark:border-white/20 ${isArabic ? 'rtl' : 'ltr'}`}>
        <div className="text-5xl">🗺️</div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{t("mapTitle")}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t("mapDescription")}
        </p>
        <a
          href="/map1.pdf"
          download="TEDx_Event_Map.pdf"
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
        >
          {t("downloadMap")}
        </a>
      </div>

      {/* Call to Action */}
      <div className={`text-center space-y-4 mt-12 ${isArabic ? 'rtl' : 'ltr'}`}>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("readyTitle")}</h2>
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
    <main
      className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-primary/90 dark:to-black text-gray-900 dark:text-white overflow-hidden"
      style={{
        backgroundImage: "url('/pattern1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/40 z-0"></div>

      <div className="relative z-10 container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HomeContent />
      </div>
    </main>
  );
}
