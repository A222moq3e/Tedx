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
    <header>
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/40 to-transparent px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-sans text-xl font-bold">
                TEDx
              </span>
              <span className="text-foreground ml-2 text-xl font-bold">
                {isAdminPage ? t("adminBrandSuffix") : ""}
              </span>
            </Link>
            <div className="flex space-x-6">
              {isAdminPage ? (
                // Admin Navigation
                <>
                  <Link
                    href="/admin/users"
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      pathname?.includes("/admin/users")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    👥 {t("users")}
                  </Link>
                  <Link
                    href="/admin/events"
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      pathname?.includes("/admin/events")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary"
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
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    🔐 {t("admin")}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAdminPage && (
              <>
                <Link
                  href="/api/trpc/health.check"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md px-2 py-1 text-sm font-medium transition-colors"
                  target="_blank"
                >
                  📊 {t("apiStatus")}
                </Link>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-2 py-1 text-sm font-medium transition-colors"
                >
                  ← {t("backToHome")}
                </Link>
                <div className="bg-border h-5 w-px" />
              </>
            )}
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
