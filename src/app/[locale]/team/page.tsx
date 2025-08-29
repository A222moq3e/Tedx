import { type Locale } from "~/i18n/routing";
import { getTranslations } from "next-intl/server";
import { TeamSection } from "~/components/TeamSection";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Main page component that renders the team (Server Component)
export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");

  return (
    <main className="tedx-animated-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-gray-900 dark:text-white">
      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-white/20 dark:bg-black/40"></div>

      <div className="relative z-10 container flex flex-col items-center justify-center px-4 py-16">
        {/* Hero section with the main title */}
        <div className="mb-16 w-full text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">
            {locale === "ar" ? (
              <>
                <span className="font-bold text-gray-900 dark:text-white">
                  فريق{" "}
                </span>
                <span className="text-primary font-bold">تيدكس</span>
              </>
            ) : (
              <>
                <span className="text-primary font-bold">TEDx </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  Team
                </span>
              </>
            )}
          </h1>
          <h2 className="mb-6 text-3xl font-light text-gray-700 md:text-4xl dark:text-gray-300">
            {t("teamTitle")}
          </h2>
        </div>

        {/* Team Section - Using the exact same component from main page */}
        <TeamSection />
      </div>
    </main>
  );
}
