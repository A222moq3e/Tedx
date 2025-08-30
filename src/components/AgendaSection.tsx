"use client";

import { useTranslations, useLocale } from "next-intl";

export function AgendaSection() {
  const t = useTranslations("Agenda");
  const locale = useLocale();
  
  const agendaItems = [
    { id: 1, type: "registration", duration: "1h 30m" },
    { id: 2, type: "exhibition", duration: "30m" },
    { id: 3, type: "opening", duration: "50m" },
    { id: 4, type: "session1", duration: "1h" },
    { id: 5, type: "break1", duration: "30m" },
    { id: 6, type: "session2", duration: "1h 25m" },
    { id: 7, type: "break2", duration: "15m" },
    { id: 8, type: "session3", duration: "1h" },
    { id: 9, type: "closing", duration: "15m" }
  ];

  return (
    <div className="w-full max-w-6xl">
      <div className="bg-gray-100/80 dark:bg-white/10 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/20 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {locale === 'ar' 
              ? 'اكتشف جدولنا المنسق بعناية من المحاضرات الملهمة وورش العمل التفاعلية'
              : 'Discover our carefully curated schedule of inspiring talks and interactive workshops'
            }
          </p>
        </div>

        {/* Agenda Grid */}
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
          {agendaItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex flex-col gap-4 rounded-xl bg-gray-100/80 dark:bg-white/10 p-6 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20 h-full ${locale === 'ar' ? 'text-right' : 'text-left'}`}
              style={{
                order: locale === 'ar' ? 
                  (Math.floor(index / 3) * 3) + (2 - (index % 3)) : 
                  index
              }}
            >
              {/* Item Title */}
              <h4 className={`text-2xl font-bold text-gray-900 dark:text-white flex-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {t(`agendaItems.${item.type}` as "agendaItems.registration" | "agendaItems.exhibition" | "agendaItems.opening" | "agendaItems.session1" | "agendaItems.break1" | "agendaItems.session2" | "agendaItems.break2" | "agendaItems.session3" | "agendaItems.closing")}
              </h4>
              
              {/* Time and Duration */}
              <div className={`space-y-3 pt-2 mt-auto ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {/* Time */}
                <div className={`flex items-center justify-between ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-base font-bold text-gray-800 dark:text-gray-200">
                    {locale === 'ar' ? 'الوقت' : 'Time'}
                  </span>
                                      <span className={`text-sm font-semibold text-gray-900 dark:text-white bg-gray-200 dark:bg-white/20 px-3 py-1 rounded-lg ${locale === 'ar' ? 'text-right' : 'text-left'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                      {t(`timeSlots.slot${item.id}` as "timeSlots.slot1" | "timeSlots.slot2" | "timeSlots.slot3" | "timeSlots.slot4" | "timeSlots.slot5" | "timeSlots.slot6" | "timeSlots.slot7" | "timeSlots.slot8" | "timeSlots.slot9")}
                    </span>
                </div>
                
                {/* Duration */}
                <div className={`flex items-center justify-between ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-base font-bold text-gray-800 dark:text-gray-200">
                    {locale === 'ar' ? 'المدة' : 'Duration'}
                  </span>
                  <span className="text-sm font-semibold text-white bg-primary px-3 py-1 rounded-lg shadow-sm">
                    {item.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
