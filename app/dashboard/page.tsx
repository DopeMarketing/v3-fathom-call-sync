import Link from 'next/link'

export default async function DashboardPage() {
  // TODO: Fetch connections status from database
  // TODO: Fetch recent sync jobs from database  
  // TODO: Fetch transcript count from database

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sync Dashboard</h1>
        <p className="text-gray-600">Monitor and control your transcript sync operations</p>
      </div>

      {/* Connection Status */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">Fathom Connection</h2>
          <div className="mt-2 flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="ml-2 text-sm text-gray-600">Not Connected</span>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">Google Drive Connection</h2>
          <div className="mt-2 flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="ml-2 text-sm text-gray-600">Not Connected</span>
          </div>
        </div>
      </div>

      {/* Sync Status Panel */}
      <div className="mb-8 rounded-lg border bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Sync Status</h2>
            <p className="text-sm text-gray-600">Last sync: Never</p>
          </div>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Manual Sync
          </button>
        </div>
      </div>

      {/* Stats and Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-600">Transcripts Synced</div>
        </div>
        <Link href="/connections" className="rounded-lg border bg-white p-6 hover:bg-gray-50">
          <h3 className="font-semibold">Manage Connections</h3>
          <p className="text-sm text-gray-600">Configure API authentication</p>
        </Link>
        <Link href="/history" className="rounded-lg border bg-white p-6 hover:bg-gray-50">
          <h3 className="font-semibold">View History</h3>
          <p className="text-sm text-gray-600">See all sync operations</p>
        </Link>
      </div>
    </div>
  )
}