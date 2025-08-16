"use client";

import { Link } from "~/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "./theme-toggle";

export default function Navigation() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");
  const t = useTranslations("Navigation");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-red-600">TEDx</span>
              <span className="ml-2 text-xl font-bold text-gray-900">
                {isAdminPage ? t("adminBrandSuffix") : ''}
              </span>
            </Link>
            <div className="flex space-x-6">
              {isAdminPage ? (
                // Admin Navigation
                <>
                  <Link
                    href="/admin/users"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname?.includes("/admin/users")
                        ? "bg-primary/20 text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    👥 {t("users")}
                  </Link>
                  <Link
                    href="/admin/events"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname?.includes("/admin/events")
                        ? "bg-primary/20 text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    🎪 {t("events")}
                  </Link>
                </>
              ) : (
                // Public Navigation
                <>
                  <Link
                    href="/admin"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    🔐 {t("admin")}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isAdminPage && (
              <>
                <Link
                  href="/api/trpc/health.check"
                  className="text-primary hover:text-primary/80 text-sm font-medium px-2 py-1 rounded-md hover:bg-primary/10 transition-colors"
                  target="_blank"
                >
                  📊 {t("apiStatus")}
                </Link>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground text-sm font-medium px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                >
                  ← {t("backToHome")}
                </Link>
              </>
            )}
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