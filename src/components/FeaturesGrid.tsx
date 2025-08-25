"use client";

import { useTranslations, useLocale } from "next-intl";
import { Mic, Calendar, Users } from "lucide-react";

export function FeaturesGrid() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 mt-20 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 ${isArabic ? 'text-right' : 'text-left'}`}>
        <Mic className="w-10 h-10 text-primary" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("speakersTitle")}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t("speakersDescription")}
        </p>
      </div>
      <div className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 ${isArabic ? 'text-right' : 'text-left'}`}>
        <Calendar className="w-10 h-10 text-primary" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("eventsTitle")}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t("eventsDescription")}
        </p>
      </div>
      <div className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 ${isArabic ? 'text-right' : 'text-left'}`}>
        <Users className="w-10 h-10 text-primary" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("communityTitle")}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t("communityDescription")}
        </p>
      </div>
    </div>
  );
}
