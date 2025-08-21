"use client";

import { Link } from "~/i18n/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
            <Link href="/" className="flex justify-center items-center">
              <Image 
                src="/logos_svg/(1)-05.svg" 
                alt="TEDx IMAMU" 
                width={32}
                height={32}
                className="w-auto h-27 dark:hidden"
              />
              <Image 
                src="/logos_svg/(1)-06.svg" 
                alt="TEDx IMAMU" 
                width={32}
                height={32}
                className="w-auto h-27 hidden dark:block"
              />
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