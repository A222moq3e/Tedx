"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "~/i18n/navigation";

export function HeroSection() {
  const t = useTranslations("HomePage");

  return (
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
  );
}
