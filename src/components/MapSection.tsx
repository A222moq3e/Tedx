"use client";

import { useTranslations, useLocale } from "next-intl";
import { Map } from "lucide-react";

export function MapSection() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className={`flex flex-col gap-6 rounded-xl bg-gray-100/80 dark:bg-white/10 p-8 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors mt-12 max-w-2xl mx-auto text-center border border-gray-200 dark:border-white/20 ${isArabic ? 'rtl' : 'ltr'}`}>
      <Map className="w-12 h-12 text-primary mx-auto" />
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
  );
}
