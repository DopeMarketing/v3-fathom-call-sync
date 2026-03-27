import Link from 'next/link'

export default async function SettingsPage() {
  // TODO: Fetch current settings from database
  // TODO: Fetch available Google Drive folders from API
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure your sync preferences and Google Drive folder settings.
        </p>
      </div>

      {/* Google Drive Folder Selection */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Google Drive Folder</h3>
          <p className="text-sm text-gray-500">Choose where transcripts should be saved</p>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Folder
            </label>
            <div className="flex items-center space-x-3">
              <input 
                type="text" 
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" 
                placeholder="Select a folder..."
                readOnly
              />
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Browse
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <Link href="/connections" className="text-blue-600 hover:text-blue-500">
              Connect Google Drive
            </Link> to browse folders
          </p>
        </div>
      </div>

      {/* Sync Preferences */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sync Preferences</h3>
          <p className="text-sm text-gray-500">Control how and when transcripts are synced</p>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Sync</label>
              <p className="text-xs text-gray-500">Automatically sync new transcripts</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Include Timestamps</label>
              <p className="text-xs text-gray-500">Add timestamps to transcript files</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
          </div>
        </div>
      </div>

      {/* Duplicate Handling */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Duplicate Handling</h3>
          <p className="text-sm text-gray-500">How to handle files that already exist</p>
        </div>
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center">
            <input id="skip" name="duplicate" type="radio" className="h-4 w-4 text-blue-600 focus:ring-blue-500" defaultChecked />
            <label htmlFor="skip" className="ml-3 text-sm text-gray-700">Skip duplicate files</label>
          </div>
          <div className="flex items-center">
            <input id="overwrite" name="duplicate" type="radio" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="overwrite" className="ml-3 text-sm text-gray-700">Overwrite existing files</label>
          </div>
          <div className="flex items-center">
            <input id="rename" name="duplicate" type="radio" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="rename" className="ml-3 text-sm text-gray-700">Create new file with timestamp</label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  )
}