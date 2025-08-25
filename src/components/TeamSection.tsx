"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Button } from "~/components/ui/button";

// Team member data - you can customize this
const teamMembers = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    role: "Event Director",
    image: "/avatar1.jpeg", // Using existing avatar from public folder
    linkedin: "https://linkedin.com/in/ahmed-al-rashid",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "/avatar1.jpeg", // You can add more team member images to public folder
    linkedin: "https://linkedin.com/in/sarah-johnson",
  },
  {
    id: 3,
    name: "Mohammed Al-Zahra",
    role: "Technical Lead",
    image: "/avatar1.jpeg",
    linkedin: "https://linkedin.com/in/mohammed-al-zahra",
  },
  {
    id: 4,
    name: "Fatima Al-Sayed",
    role: "Marketing Manager",
    image: "/avatar1.jpeg",
    linkedin: "https://linkedin.com/in/fatima-al-sayed",
  },
];

export function TeamSection() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className={`mt-20 w-full ${isArabic ? "rtl" : "ltr"}`}>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          {t("teamTitle")}
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          {t("teamDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className={`group relative flex h-64 flex-col rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:h-72 sm:p-6 lg:h-80 dark:border-gray-700 dark:bg-gray-800/80 ${isArabic ? "text-right" : "text-left"}`}
          >
            {/* Member Image */}
            <div className="mb-4 flex-shrink-0 sm:mb-6">
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-gray-200 sm:h-24 sm:w-24 dark:border-gray-600">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  priority={member.id <= 2} // Prioritize first 2 images
                />
              </div>
            </div>

            {/* Member Info - Takes remaining space */}
            <div className="flex flex-1 flex-col text-center">
              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                {member.name}
              </h3>
              <p className="mb-3 flex-1 text-sm text-gray-600 sm:mb-4 sm:text-base dark:text-gray-300">
                {member.role}
              </p>

              {/* LinkedIn Button - Always at bottom */}
              <div className="mt-auto">
                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-gray-300 bg-white/50 text-gray-700 transition-all duration-200 hover:border-[#cf0200] hover:bg-[#cf0200] hover:text-white dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-[#cf0200] dark:hover:bg-[#cf0200] dark:hover:text-white"
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
