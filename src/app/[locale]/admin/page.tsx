"use client";

import { Link } from "~/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AdminDashboard() {
  const t = useTranslations("AdminDashboard");
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Admin Dashboard Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          <span className="text-red-600">TEDx</span> {t("title")}
        </h1>
        <p className="text-lg text-gray-600">
          {t("subtitle")}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{t("usersTitle")}</h3>
              <p className="text-sm text-gray-600">{t("usersDescription")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🎪</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{t("eventsTitle")}</h3>
              <p className="text-sm text-gray-600">{t("eventsDescription")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">👥</div>
            <h2 className="text-xl font-semibold text-gray-800">{t("userManagementTitle")}</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {t("userManagementDescription")}
          </p>
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors"
            >
              {t("manageUsers")}
            </Link>
            <div className="text-sm text-gray-500">
              {t("userManagementFeatures")}
            </div>
          </div>
        </div>

        {/* Event Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🎪</div>
            <h2 className="text-xl font-semibold text-gray-800">{t("eventManagementTitle")}</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {t("eventManagementDescription")}
          </p>
          <div className="space-y-2">
            <Link
              href="/admin/events"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors"
            >
              {t("manageEvents")}
            </Link>
            <div className="text-sm text-gray-500">
              {t("eventManagementFeatures")}
            </div>
          </div>
        </div>

        {/* System Monitoring */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">📊</div>
            <h2 className="text-xl font-semibold text-gray-800">{t("systemMonitoringTitle")}</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {t("systemMonitoringDescription")}
          </p>
          <div className="space-y-2">
            <Link
              href="/api/trpc/health.check"
              target="_blank"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors"
            >
              {t("apiHealthCheck")}
            </Link>
            <div className="text-sm text-gray-500">
              {t("systemMonitoringFeatures")}
            </div>
          </div>
        </div>

        {/* Database Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🗄️</div>
            <h2 className="text-xl font-semibold text-gray-800">{t("databaseManagementTitle")}</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {t("databaseManagementDescription")}
          </p>
          <div className="space-y-2">
            <div className="bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md font-medium">
              {t("databaseConnected")}
            </div>
            <div className="text-sm text-gray-500">
              {t("databaseManagementFeatures")}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("quickAccessTitle")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}