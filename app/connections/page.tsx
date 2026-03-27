export default async function ConnectionsPage() {
  // TODO: Fetch current connection status from database
  // TODO: Fetch OAuth token status and expiry dates
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">API Connections</h1>
        <p className="mt-2 text-gray-600">
          Connect your Fathom and Google Drive accounts to enable transcript syncing.
        </p>
      </div>

      {/* Fathom Connection */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Fathom API</h3>
              <p className="text-sm text-gray-500">Connect to fetch your call transcripts</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Not Connected
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <p>Status: Disconnected</p>
              <p>Last connected: Never</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Connect Fathom
            </button>
          </div>
        </div>
      </div>

      {/* Google Drive Connection */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Google Drive</h3>
              <p className="text-sm text-gray-500">Connect to upload transcripts to your drive</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Not Connected
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <p>Status: Disconnected</p>
              <p>Last connected: Never</p>
              <p>Selected folder: Not configured</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              Connect Google Drive
            </button>
          </div>
        </div>
      </div>

      {/* Connection Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-blue-900 mb-2">Setup Instructions</h4>
        <ol className="list-decimal list-inside text-blue-800 space-y-1">
          <li>First, connect your Fathom account to authorize transcript access</li>
          <li>Then connect your Google Drive to enable file uploads</li>
          <li>Configure your preferred sync settings</li>
          <li>Run your first sync from the dashboard</li>
        </ol>
      </div>
    </div>
  )
}