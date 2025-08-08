import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Admin Dashboard Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          <span className="text-red-600">TEDx</span> Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage your TEDx event with powerful admin tools
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Users</h3>
              <p className="text-sm text-gray-600">Manage all users</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🎪</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Events</h3>
              <p className="text-sm text-gray-600">Organize your events</p>
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
            <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Create, edit, and manage users. Handle speaker profiles and user types.
          </p>
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors"
            >
              Manage Users
            </Link>
            <div className="text-sm text-gray-500">
              • Create new users • Edit user details • Manage speaker profiles
            </div>
          </div>
        </div>

        {/* Event Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🎪</div>
            <h2 className="text-xl font-semibold text-gray-800">Event Management</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Create and organize events, set capacity, assign presenters, and manage schedules.
          </p>
          <div className="space-y-2">
            <Link
              href="/admin/events"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors"
            >
              Manage Events
            </Link>
            <div className="text-sm text-gray-500">
              • Schedule events • Set capacity • Assign presenters
            </div>
          </div>
        </div>

        {/* System Monitoring */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">📊</div>
            <h2 className="text-xl font-semibold text-gray-800">System Monitoring</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Monitor system health and API status for optimal performance.
          </p>
          <div className="space-y-2">
            <Link
              href="/api/trpc/health.check"
              target="_blank"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors"
            >
              API Health Check
            </Link>
            <div className="text-sm text-gray-500">
              • System status • Database connectivity • API performance
            </div>
          </div>
        </div>

        {/* Database Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🗄️</div>
            <h2 className="text-xl font-semibold text-gray-800">Database Management</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Manage database operations and view system information.
          </p>
          <div className="space-y-2">
            <div className="bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md font-medium">
              Database Connected
            </div>
            <div className="text-sm text-gray-500">
              • Database health • Connection status • Data integrity
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Access</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}