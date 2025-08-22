"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

import { Button } from "~/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("Theme")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 border-border hover:border-primary hover:bg-primary/10 transition-all duration-200 shadow-sm"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90 text-muted-foreground" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0 text-muted-foreground" />
      <span className="sr-only">{t("toggleTheme")}</span>
    </Button>
  )
}
