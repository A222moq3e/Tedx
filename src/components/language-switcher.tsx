"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { type Locale } from "~/i18n/routing";
import { useRouter, usePathname } from "~/i18n/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { routing } from "~/i18n/routing";

const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-3 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-200 shadow-sm"
        >
          <Globe className="mr-2 h-4 w-4 text-gray-500" />
          <span className="font-medium">{localeNames[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 border-gray-200 shadow-lg"
        sideOffset={8}
      >
        {routing.locales.map((loc) => (
          <DropdownMenuItem 
            key={loc} 
            onClick={() => switchLocale(loc)}
            className={`cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors ${
              locale === loc ? 'bg-red-100 text-red-700 font-medium' : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{localeNames[loc]}</span>
              {locale === loc && <span className="text-red-500">✓</span>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
