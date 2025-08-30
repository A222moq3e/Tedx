import { type Locale } from "~/i18n/routing";
import { getTranslations } from "next-intl/server";
import { AgendaSection } from "~/components/AgendaSection";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Main page component that renders the agenda (Server Component)
export default async function AgendaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Agenda");



  return (
    <main className="tedx-animated-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-gray-900 dark:text-white">
      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-white/20 dark:bg-black/40"></div>

      <div className="relative z-10 container flex flex-col items-center justify-center px-4 py-16">
        {/* Hero section with the main title */}
        <div className="text-center space-y-6 min-h-[40vh] flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {locale === 'ar' ? (
              <>
                <span className="text-gray-900 dark:text-white font-bold">ما بعد </span>
                <span className="text-primary font-bold">اللحظة</span>
              </>
            ) : (
              <>
                <span className="text-gray-900 dark:text-white font-bold">Beyond The </span>
                <span className="text-primary font-bold">Moment</span>
              </>
            )}
          </h1>
          <h2 className="mb-6 text-3xl font-light text-gray-600 dark:text-gray-300">
            {t("heroSubtitle")}
          </h2>
        </div>

        {/* Agenda Section */}
        <AgendaSection />
      </div>
    </main>
  );
} 