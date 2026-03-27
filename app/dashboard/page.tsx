import Link from 'next/link'

export default async function DashboardPage() {
  // TODO: Fetch connections status from database
  // TODO: Fetch recent sync jobs from database
  // TODO: Fetch transcript count from database

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sync Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor and control your Fathom to Google Drive sync operations</p>
      </div>

      {/* Connection Status */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Fathom Connection</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Not Connected</span>
          </div>
          <Link href="/connections" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
            Configure →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Google Drive Connection</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Not Connected</span>
          </div>
          <Link href="/connections" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
            Configure →
          </Link>
        </div>
      </div>

      {/* Sync Status Panel */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Sync Status</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Manual Sync
          </button>
        </div>
        <div className="text-gray-600">
          <p>Last sync: Never</p>
          <p>Status: Ready</p>
          <p>Transcripts synced: 0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Link href="/history" className="text-blue-600 hover:text-blue-800 text-sm">
            View All →
          </Link>
        </div>
        <div className="text-gray-500 text-center py-8">
          No sync activity yet
        </div>
      </div>
    </div>
  )
}