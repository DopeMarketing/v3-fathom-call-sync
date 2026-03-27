export default async function ConnectionsPage() {
  // TODO: Fetch current connection status from database
  // TODO: Check OAuth token validity

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">API Connections</h1>
        <p className="mt-2 text-gray-600">Connect your Fathom and Google Drive accounts to enable syncing</p>
      </div>

      {/* Fathom Connection */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Fathom API</h2>
            <p className="text-gray-600 mb-4">Connect to access your call transcripts</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Not Connected</span>
            </div>
          </div>
          <div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Connect Fathom
            </button>
          </div>
        </div>
      </div>

      {/* Google Drive Connection */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Google Drive API</h2>
            <p className="text-gray-600 mb-4">Connect to upload transcripts to your Drive</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Not Connected</span>
            </div>
          </div>
          <div>
            <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Connect Google Drive
            </button>
          </div>
        </div>
      </div>

      {/* Connection Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Setup Requirements</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Active Fathom account with API access
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Google account with Drive access
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            OAuth permissions for both services
          </li>
        </ul>
      </div>
    </div>
  )
}