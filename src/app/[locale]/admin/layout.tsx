"use client";

import { useTranslations } from "next-intl";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("AdminLayout");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Content with some padding */}
      <main className="py-6">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              {t("footerText")}
            </div>
            <div className="flex space-x-4">
              <span>{t("adminDashboard")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}