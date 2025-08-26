"use client";

import { useTranslations, useLocale } from "next-intl";
import { Eye, Target, ListChecks, CheckCircle } from "lucide-react";

export function AboutUs() {
    const t = useTranslations("AboutUs");
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const objectives = (t as unknown as { raw: (key: string) => unknown }).raw?.("objectives") as string[] | undefined;

    return (
        <div className={`relative mt-12 ${isArabic ? 'rtl' : 'ltr'}`}>
            {/* Decorative gradient blobs behind the card */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-10 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
            </div>

            {/* Gradient border wrapper */}
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-primary/60 via-primary/10 to-secondary/60 shadow-2xl">
                {/* Glass content */}
                <div className="rounded-3xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10">
                    {/* Subtle top accent bar */}
                    <div className="h-1.5 w-24 mx-auto mt-6 rounded-full bg-gradient-to-r from-primary to-secondary" />

                    <div className="p-8">
                        <div className={`mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                {t("title")}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={`group relative rounded-xl p-6 border border-white/30 dark:border-white/10 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${isArabic ? 'text-right' : 'text-left'} ${isArabic ? 'md:order-3' : ''}`}>
                                <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Eye className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {t("visionTitle")}
                                    </h3>
                                </div>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    {t("vision")}
                                </p>
                                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary/20 to-secondary/20" />
                            </div>

                            <div className={`group relative rounded-xl p-6 border border-white/30 dark:border-white/10 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${isArabic ? 'text-right' : 'text-left'} ${isArabic ? 'md:order-2' : ''}`}>
                                <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Target className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {t("missionTitle")}
                                    </h3>
                                </div>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    {t("mission")}
                                </p>
                                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary/20 to-secondary/20" />
                            </div>

                            <div className={`group relative rounded-xl p-6 border border-white/30 dark:border-white/10 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${isArabic ? 'text-right' : 'text-left'} ${isArabic ? 'md:order-1' : ''}`}>
                                <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <ListChecks className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {t("objectivesTitle")}
                                    </h3>
                                </div>
                                <ul className={`space-y-2 ${isArabic ? 'pr-1' : 'pl-1'}`}>
                                    {(objectives ?? []).map((item, index) => (
                                        <li key={index} className={`flex items-start ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <span className="mt-0.5">
                                                <CheckCircle className="w-5 h-5 text-primary" />
                                            </span>
                                            <span className={`text-base font-medium text-gray-700 dark:text-gray-300 ${isArabic ? 'mr-2' : 'ml-2'}`}>
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary/20 to-secondary/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}