"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const t = useTranslations("Theme")

  const toggleTheme = () => {
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all duration-200 flex items-center justify-center"
      aria-label={t("toggleTheme")}
    >
      <Sun className="h-4 w-4 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
