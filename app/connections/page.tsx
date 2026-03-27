import Link from 'next/link'

export default async function ConnectionsPage() {
  // TODO: Fetch connection status from database
  // TODO: Check token expiry dates

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">API Connections</h1>
        <p className="text-gray-600">Manage your OAuth connections for Fathom and Google Drive</p>
      </div>

      <div className="space-y-6">
        {/* Fathom Connection Card */}
        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">F</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fathom</h3>
                <p className="text-sm text-gray-600">Access your call recordings and transcripts</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2 flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-600">Not Connected</span>
              </div>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Connect to Fathom
              </button>
            </div>
          </div>
        </div>

        {/* Google Drive Connection Card */}
        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-semibold">G</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Google Drive</h3>
                <p className="text-sm text-gray-600">Store transcripts in your Google Drive</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2 flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-600">Not Connected</span>
              </div>
              <button className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Connect to Google Drive
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/dashboard"
          className="text-blue-600 hover:text-blue-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}