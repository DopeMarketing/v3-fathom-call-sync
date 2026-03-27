import Link from 'next/link'

export default async function HistoryPage() {
  // TODO: Fetch sync job history from database with pagination
  // TODO: Fetch transcript details for each sync job

  const mockHistory = [
    {
      id: 1,
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
      transcriptsCount: 5,
      duration: '2.3s'
    },
    {
      id: 2,
      date: '2024-01-14T15:45:00Z',
      status: 'failed',
      transcriptsCount: 0,
      duration: '1.1s',
      error: 'Authentication expired'
    }
  ]

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sync History</h1>
          <p className="text-gray-600">View detailed history of all sync operations</p>
        </div>
        <button className="rounded-md border bg-white px-4 py-2 hover:bg-gray-50">
          Export History
        </button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 flex space-x-4">
        <select className="rounded-md border px-3 py-2">
          <option>All Statuses</option>
          <option>Completed</option>
          <option>Failed</option>
          <option>In Progress</option>
        </select>
        <input
          type="date"
          className="rounded-md border px-3 py-2"
          placeholder="From date"
        />
        <input
          type="date"
          className="rounded-md border px-3 py-2"
          placeholder="To date"
        />
      </div>

      {/* History Table */}
      <div className="rounded-lg border bg-white">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Transcripts</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((job) => (
              <tr key={job.id} className="border-b">
                <td className="px-6 py-4 text-sm">
                  {new Date(job.date).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs ${
                    job.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{job.transcriptsCount}</td>
                <td className="px-6 py-4 text-sm">{job.duration}</td>
                <td className="px-6 py-4 text-sm">{job.error || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}