import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image src="/avatar1.jpeg" alt="logo" width={40} height={40} className="rounded-full" />
              <span className="ml-2 text-xl font-bold text-gray-900">TEDx Management</span>
            </Link>
            <div className="flex space-x-6">
              <Link
                href="/users"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Users
              </Link>
              <Link
                href="/events"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Events
              </Link>
              <Link
                href="/speakers"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Speakers
              </Link>
              <Link
                href="/api/trpc-playground"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                target="_blank"
              >
                API Playground
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/api/trpc/health.check"
              className="text-green-600 hover:text-green-700 text-sm"
              target="_blank"
            >
              API Status
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}