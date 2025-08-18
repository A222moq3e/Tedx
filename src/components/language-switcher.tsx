"use client";

import { useLocale } from "next-intl";
import { type Locale } from "~/i18n/routing";
import { useRouter, usePathname } from "~/i18n/navigation";
import { ChevronDown, Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isArabic = locale === "ar";

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted/80 inline-flex items-center justify-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        aria-label={isArabic ? "تغيير اللغة" : "Change language"}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="min-w-[1.5ch] text-center">
          {isArabic ? "ع" : "EN"}
        </span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        <DropdownMenuItem
          onClick={() => switchLocale("en")}
          className={`flex items-center gap-2 ${
            !isArabic ? "bg-primary/10 text-foreground" : "hover:bg-accent"
          }`}
        >
          {!isArabic ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="inline-block h-4 w-4" />
          )}
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale("ar")}
          className={`flex items-center gap-2 ${
            isArabic ? "bg-primary/10 text-foreground" : "hover:bg-accent"
          }`}
        >
          {isArabic ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="inline-block h-4 w-4" />
          )}
          <span>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
