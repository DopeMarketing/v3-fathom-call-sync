import Link from 'next/link'

export default async function DashboardPage() {
  // TODO: Fetch connections status from database
  // TODO: Fetch recent sync jobs from database
  // TODO: Fetch transcript count from database
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Sync Dashboard</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Manual Sync
        </button>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">API Connections</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Fathom API</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Not Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Google Drive</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Not Connected
              </span>
            </div>
          </div>
          <Link href="/connections" className="mt-4 text-blue-600 hover:text-blue-500 text-sm font-medium">
            Configure Connections →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Statistics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Transcripts</span>
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Last Sync</span>
              <span className="text-gray-500">Never</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Idle
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="mt-2 text-gray-500">No sync activity yet</p>
            <p className="text-sm text-gray-400">Connect your APIs to start syncing transcripts</p>
          </div>
        </div>
      </div>
    </div>
  )
}