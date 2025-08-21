"use client";

import { Link } from "~/i18n/navigation";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "./theme-toggle";
import { AdminNavigation, AdminUtilityLinks } from "./AdminNavigation";

export default function Navigation() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");

  return (
    <nav className="bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">TEDx</span>
              <span className="ml-2 text-xl font-bold text-foreground">IMAMU</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {isAdminPage && <AdminUtilityLinks />}
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}