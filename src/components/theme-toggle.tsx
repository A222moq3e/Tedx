"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("Theme")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="h-9 w-9 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90 text-amber-500" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0 text-blue-600" />
          <span className="sr-only">{t("toggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-36 border-gray-200 shadow-lg"
        sideOffset={8}
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`cursor-pointer hover:bg-amber-50 hover:text-amber-700 transition-colors ${
            theme === "light" ? 'bg-amber-100 text-amber-700 font-medium' : ''
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Sun className="mr-2 h-4 w-4 text-amber-500" />
              <span>{t("light")}</span>
            </div>
            {theme === "light" && <span className="text-amber-500">✓</span>}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors ${
            theme === "dark" ? 'bg-blue-100 text-blue-700 font-medium' : ''
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Moon className="mr-2 h-4 w-4 text-blue-600" />
              <span>{t("dark")}</span>
            </div>
            {theme === "dark" && <span className="text-blue-500">✓</span>}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`cursor-pointer hover:bg-gray-50 hover:text-gray-700 transition-colors ${
            theme === "system" ? 'bg-gray-100 text-gray-700 font-medium' : ''
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-amber-400 to-blue-600"></div>
              <span>{t("system")}</span>
            </div>
            {theme === "system" && <span className="text-gray-500">✓</span>}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
