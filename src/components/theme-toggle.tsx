"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations("Theme");

  const toggleTheme = () => {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="dark:text-muted-foreground dark:hover:text-primary dark:hover:bg-muted/50 relative flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
      aria-label={t("toggleTheme")}
    >
      <Sun className="h-4 w-4 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
