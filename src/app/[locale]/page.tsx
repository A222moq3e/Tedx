import { setRequestLocale } from "next-intl/server";
import { type Locale } from "~/i18n/routing";
import { Link } from "~/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: Locale }>;
};

function HomeContent() {
  "use client";
  const t = useTranslations("HomePage");
  return (
    <>
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-[7rem]">
          {t("heroTitle")}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl">
          {t("subtitle")}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/#"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
        >
          {t("heroTitle")}
        </Link>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 mt-12">
        <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
          <div className="text-4xl">🎤</div>
          <h3 className="text-2xl font-bold">{t("speakersTitle")}</h3>
          <p className="text-gray-300">
            {t("speakersDescription")}
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
          <div className="text-4xl">🎪</div>
          <h3 className="text-2xl font-bold">{t("eventsTitle")}</h3>
          <p className="text-gray-300">
            {t("eventsDescription")}
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
          <div className="text-4xl">🌟</div>
          <h3 className="text-2xl font-bold">{t("communityTitle")}</h3>
          <p className="text-gray-300">
            {t("communityDescription")}
          </p>
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center space-y-4 mt-12">
        <h2 className="text-3xl font-bold">{t("readyTitle")}</h2>
        <p className="text-gray-300">
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-900 to-black text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HomeContent />
      </div>
    </main>
  );
}
