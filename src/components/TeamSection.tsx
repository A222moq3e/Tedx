"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { User } from "lucide-react";
import teamData from "~/data/team.json";
import { useState } from "react";

export function TeamSection() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(
    new Set(),
  );
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  return (
    <section className={`w-full ${isArabic ? "rtl" : "ltr"}`}>
      {/* Departments */}
      <div className="space-y-16">
        {teamData.departments.map((department) => (
          <div key={department.nameEn} className="space-y-8">
            {/* Department Header */}
            <div className="px-6 text-center sm:px-4">
              <button
                onClick={() => {
                  setHasUserInteracted(true);
                  const newExpanded = new Set(expandedDepartments);
                  if (newExpanded.has(department.nameEn)) {
                    newExpanded.delete(department.nameEn);
                  } else {
                    newExpanded.add(department.nameEn);
                  }
                  setExpandedDepartments(newExpanded);
                }}
                className="group flex w-full cursor-pointer items-center justify-center transition-colors"
              >
                <div className="mx-auto w-full max-w-[280px] text-center sm:max-w-xs">
                  <h3 className="group-hover:text-primary dark:group-hover:text-primary mb-2 text-lg leading-tight font-bold text-gray-800 transition-colors sm:text-xl lg:text-2xl dark:text-white">
                    {locale === "ar" ? (
                      department.name
                    ) : (
                      <span style={{ whiteSpace: "pre-line" }}>
                        {department.nameEn}
                      </span>
                    )}
                  </h3>
                  <div
                    className={`group-hover:bg-primary dark:group-hover:bg-primary mx-auto h-1 w-20 rounded-full transition-all duration-300 sm:w-24 ${
                      expandedDepartments.has(department.nameEn)
                        ? "bg-primary"
                        : "bg-gray-400 dark:bg-gray-500"
                    } ${!hasUserInteracted ? "animate-[pulse_2s_ease-in-out_3]" : ""}`}
                  ></div>
                </div>
              </button>
            </div>

            {/* Team Members Grid */}
            {expandedDepartments.has(department.nameEn) && (
              <div className="animate-in slide-in-from-top-2 grid grid-cols-2 gap-3 px-4 duration-300 sm:gap-4 sm:px-0 lg:grid-cols-4 lg:gap-8">
                {department.members.map((member) => (
                  <div
                    key={member.id}
                    className={`group relative flex min-h-[280px] flex-col rounded-lg border border-gray-200 bg-white/90 p-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:min-h-[300px] sm:p-6 lg:min-h-[320px] dark:border-gray-700 dark:bg-gray-800/90 ${isArabic ? "text-right" : "text-left"}`}
                  >
                    {/* Member Image */}
                    <div className="mb-3 flex-shrink-0 sm:mb-6">
                      <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border-4 border-gray-200 sm:h-24 sm:w-24 dark:border-gray-600">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={
                              locale === "ar" ? member.nameAr : member.nameEn
                            }
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                            priority={member.id <= 4} // Prioritize first 4 images
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-600">
                            <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member Info - Reduced spacing for better UI */}
                    <div className="flex flex-1 flex-col text-center">
                      <h3 className="mb-2 flex h-16 items-center justify-center text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                        {locale === "ar" ? (
                          member.nameAr
                        ) : (
                          <>
                            {member.nameEn.split(" ")[0]}
                            <br />
                            {member.nameEn.split(" ").slice(1).join(" ") || " "}
                          </>
                        )}
                      </h3>
                      <p className="mb-1 flex h-16 items-center justify-center text-sm text-gray-600 sm:mb-2 sm:text-base dark:text-gray-300">
                        {locale === "ar" ? (
                          member.roleAr
                        ) : (
                          <>
                            {member.roleEn.includes(" of ") ? (
                              <>
                                {member.roleEn.split(" of ")[0]} of
                                <br />
                                {member.roleEn.split(" of ")[1]}
                              </>
                            ) : (
                              <>
                                {member.roleEn}
                                <br />
                                &nbsp;
                              </>
                            )}
                          </>
                        )}
                      </p>

                      {/* LinkedIn Button - Always at bottom */}
                      <div className="mt-auto">
                        {member.linkedin ? (
                          <Button
                            asChild
                            size="default"
                            variant="outline"
                            className="w-full min-w-[120px] border-gray-300 bg-white/80 text-gray-700 transition-all duration-200 hover:border-[#cf0200] hover:bg-[#cf0200] hover:text-white sm:min-w-[140px] dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-[#cf0200] dark:hover:bg-[#cf0200] dark:hover:text-white"
                          >
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2"
                            >
                              <svg
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{t("connectOnLinkedIn")}</span>
                            </a>
                          </Button>
                        ) : (
                          <Button
                            size="default"
                            variant="outline"
                            disabled
                            className="w-full min-w-[120px] border-gray-200 bg-gray-100 text-gray-400 sm:min-w-[140px] dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-500"
                          >
                            <svg
                              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{t("connectOnLinkedIn")}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
