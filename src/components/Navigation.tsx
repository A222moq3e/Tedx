"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-red-600">TEDx</span>
              <span className="ml-2 text-xl font-bold text-gray-900">
                {isAdminPage ? "Admin Panel" : "Management"}
              </span>
            </Link>
            <div className="flex space-x-6">
              {isAdminPage ? (
                // Admin Navigation
                <>
                  <Link
                    href="/admin/users"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === "/admin/users"
                        ? "bg-red-100 text-red-700"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    👥 Users
                  </Link>
                  <Link
                    href="/admin/events"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === "/admin/events"
                        ? "bg-red-100 text-red-700"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    🎪 Events
                  </Link>
                </>
              ) : (
                // Public Navigation
                <>
                  <Link
                    href="/admin"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    🔐 Admin
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
                  className="text-green-600 hover:text-green-700 text-sm"
                  target="_blank"
                >
                  📊 API Status
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  ← Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}