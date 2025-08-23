"use client";

import { useTranslations, useLocale } from "next-intl";
import { Calendar, Clock, MapPin } from "lucide-react";

export function EventDetails() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5 dark:from-primary/10 dark:via-gray-900 dark:to-secondary/10 rounded-2xl p-8 mt-12 border border-primary/20 dark:border-primary/30 shadow-lg ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        {/* Event Name Header */}
        <div className={`text-center mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t("eventDetailsTitle")}
          </h2>
        </div>

        {/* Event Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date Card */}
          <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 hover:scale-105 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isArabic ? 'التاريخ' : 'Date'}
              </h3>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t("eventDate")}
            </p>
          </div>

          {/* Time Card */}
          <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 hover:scale-105 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isArabic ? 'الوقت' : 'Time'}
              </h3>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t("eventTime")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t("eventTimezone")}
            </p>
          </div>

          {/* Location Card */}
          <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 hover:scale-105 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isArabic ? 'الموقع' : 'Location'}
              </h3>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t("eventLocation")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t("eventCountry")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
