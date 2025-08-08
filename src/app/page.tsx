import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-900 to-black text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-[7rem]">
            TEDx <span className="text-red-500">Event</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl">
            Ideas Worth Spreading - Join us for an inspiring journey of innovation, 
            creativity, and thought-provoking conversations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/users"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            Manage Users
          </Link>
          <Link
            href="/events"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            View Events
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 mt-12">
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl">🎤</div>
            <h3 className="text-2xl font-bold">Speakers</h3>
            <p className="text-gray-300">
              Connect with inspiring speakers sharing groundbreaking ideas.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl">🎪</div>
            <h3 className="text-2xl font-bold">Events</h3>
            <p className="text-gray-300">
              Participate in talks, VR experiences, and interactive sessions.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl">🌟</div>
            <h3 className="text-2xl font-bold">Community</h3>
            <p className="text-gray-300">
              Join a community of innovators, creators, and change-makers.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 mt-12">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-gray-300">
            Explore our management tools and join the TEDx experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              href="/api/trpc-playground"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              API Playground
            </Link>
            <Link
              href="/speakers"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Speakers
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
