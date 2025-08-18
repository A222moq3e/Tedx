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
      <div className="space-y-6 text-center">
        <h1 className="text-foreground text-6xl font-extrabold tracking-tight sm:text-[7rem]">
          {t("heroTitle")}
        </h1>
        <p className="max-w-2xl text-xl text-muted-foreground sm:text-2xl">
          {t("subtitle")}
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="#agenda"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
        >
          {t("viewAgenda")}
        </Link>
      </div>
      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
  <div className="flex flex-col gap-4 rounded-xl bg-card p-6 border border-border shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
          <div className="text-4xl">🎤</div>
          <h3 className="text-2xl font-bold text-card-foreground">{t("speakersTitle")}</h3>
          <p className="text-muted-foreground">{t("speakersDescription")}</p>
        </div>
  <div className="flex flex-col gap-4 rounded-xl bg-card p-6 border border-border shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
          <div className="text-4xl">🎪</div>
          <h3 className="text-2xl font-bold text-card-foreground">{t("eventsTitle")}</h3>
          <p className="text-muted-foreground">{t("eventsDescription")}</p>
        </div>
  <div className="flex flex-col gap-4 rounded-xl bg-card p-6 border border-border shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
          <div className="text-4xl">🌟</div>
          <h3 className="text-2xl font-bold text-card-foreground">{t("communityTitle")}</h3>
          <p className="text-muted-foreground">{t("communityDescription")}</p>
        </div>
      </div>
      {/* Call to Action */}
      <div className="mt-12 space-y-4 text-center">
        <h2 className="text-3xl font-bold text-foreground">{t("readyTitle")}</h2>
        <p className="text-muted-foreground">{t("readyDescription")}</p>
      </div>

    </>
  );
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main 
      className="relative -mt-14 pt-14 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/90 to-black text-white overflow-hidden"
      style={{
        backgroundImage: "url('/pattern1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="relative z-10 container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HomeContent />
      </div>
    </main>
  );
}
