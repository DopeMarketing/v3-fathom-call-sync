export default async function HistoryPage() {
  // TODO: Fetch sync history from sync_jobs table
  // TODO: Fetch transcript details from transcripts table

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sync History</h1>
        <p className="mt-2 text-gray-600">View detailed history of all sync operations and transcript transfers</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All statuses</option>
              <option>Success</option>
              <option>Failed</option>
              <option>In Progress</option>
            </select>
          </div>
          <div className="ml-auto">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Sync History Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transcripts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No sync history available yet. Connect your accounts and run your first sync.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}