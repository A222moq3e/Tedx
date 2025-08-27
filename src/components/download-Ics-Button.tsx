"use client";

import { useLocale } from "next-intl";


export default function DownloadIcsButton() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const label = isArabic ? "أضِف إلى التقويم" : "Add to calendar";

  const event = {
    title: "Team Meeting",
    start: "2025-09-01T10:00:00Z",
    end: "2025-09-01T11:00:00Z",
    location: "Zoom",
    description: "Discuss Q3",
  } as const;

  // Build the query string so that the API route can read the parameters.
  const href = `/api/ics?${new URLSearchParams(event).toString()}`;

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      download="events.ics"
      className={[
        "group inline-flex items-center gap-1 rounded-full",
        // small and barely noticeable
        "px-2 py-1 text-xs opacity-70 hover:opacity-100",
        // subtle surfaces that match light/dark identity
        "bg-gray-100/60 dark:bg-white/10 border border-gray-200/70 dark:border-white/20",
        // smooth interaction
        "transition-colors duration-200 hover:bg-gray-200/80 dark:hover:bg-white/20",
        // respect direction
        isArabic ? "rtl flex-row-reverse" : "ltr",
      ].join(" ")}
    >
      {/* Inline calendar icon to avoid extra deps; flips with RTL via flex-row-reverse */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5 text-gray-700 dark:text-gray-200"
        aria-hidden="true"
      >
        <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1.5A2.5 2.5 0 0122 6.5v12A2.5 2.5 0 0119.5 21h-15A2.5 2.5 0 012 18.5v-12A2.5 2.5 0 014.5 4H6V3a1 1 0 011-1zm12.5 8.5v-4A.5.5 0 0019 6h-1.5V7a1 1 0 11-2 0V6H9v1a1 1 0 11-2 0V6H5a.5.5 0 00-.5.5v4H19.5z" />
        <path d="M3.5 11H20.5v7.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5V11z" />
      </svg>
      <span className="text-gray-800 dark:text-gray-200 whitespace-nowrap">
        {label}
      </span>
      {/* Creative, subtle accent: a tiny animated dot that pings on hover */}
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-0 group-hover:opacity-40 transition-opacity"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary/70"></span>
      </span>
    </a>
  );
}
