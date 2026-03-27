import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Sync Fathom Transcripts to Google Drive
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Automatically transfer your Fathom call recordings and transcripts to your Google Drive for secure storage and easy access.
        </p>
      </div>

      {/* Feature Overview */}
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="text-center">
          <h3 className="text-lg font-semibold">OAuth Integration</h3>
          <p className="mt-2 text-gray-600">Secure authentication with both Fathom and Google Drive APIs</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Automated Sync</h3>
          <p className="mt-2 text-gray-600">Set up once and let the system handle regular transcript transfers</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">History Tracking</h3>
          <p className="mt-2 text-gray-600">Monitor all sync operations with detailed logs and status updates</p>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="mt-16 text-center">
        <Link
          href="/dashboard"
          className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}