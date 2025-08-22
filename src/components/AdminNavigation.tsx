"use client";

import { Link } from "~/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface AdminNavigationProps {
  isAdminPage: boolean;
}

export function AdminNavigation({ isAdminPage }: AdminNavigationProps) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  if (!isAdminPage) {
    return (
      <Link
        href="/admin"
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        🔐 {t("admin")}
      </Link>
    );
  }

  return (
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
  );
}

export function AdminUtilityLinks() {
  const t = useTranslations("Navigation");

  return (
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
  );
}
