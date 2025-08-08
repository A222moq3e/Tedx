import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { type Locale } from "~/i18n/routing";
import { Link } from "~/i18n/navigation";



type Props = {
  params: Promise<{ locale: Locale }>;
};

function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="mb-8 text-center">
      <h2 className="mb-2 text-3xl font-bold text-foreground">{t("welcome")}</h2>
      <span className="font-sans">TedX</span>{" "}
      <span className="font-arabic">تيد اكس</span>
      <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
    </div>
  );
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-900 to-black text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <HomePage />

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-[7rem]">
            TEDx <span className="text-red-500">Event</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl">
            Ideas Worth Spreading - Join us for an inspiring journey of innovation, 
            creativity, and thought-provoking conversations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/admin"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            🔐 Admin Panel
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 mt-12">
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl">🎤</div>
            <h3 className="text-2xl font-bold">Speakers</h3>
            <p className="text-gray-300">
              Connect with inspiring speakers sharing groundbreaking ideas.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl">🎪</div>
            <h3 className="text-2xl font-bold">Events</h3>
            <p className="text-gray-300">
              Participate in talks, VR experiences, and interactive sessions.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl">🌟</div>
            <h3 className="text-2xl font-bold">Community</h3>
            <p className="text-gray-300">
              Join a community of innovators, creators, and change-makers.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 mt-12">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-gray-300">
            Explore our management tools and join the TEDx experience.
          </p>
        </div>
      </div>
    </main>
  );
}
