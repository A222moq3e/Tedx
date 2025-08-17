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
      <div className="mb-8 text-center">
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          {t("welcome")}
        </h2>
        <p className="text-muted-foreground text-xl">{t("subtitle")}</p>
      </div>
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
          href="/#"
          className="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
        >
          Hello world!
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
  <main className="flex min-h-screen flex-col items-center justify-center text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HomeContent />
      </div>
    </main>
  );
}
