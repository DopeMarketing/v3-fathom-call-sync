export default async function SettingsPage() {
  // TODO: Fetch current settings from settings table
  // TODO: Fetch Google Drive folders for folder selector

  const handleSaveSettings = async () => {
    'use server'
    // TODO: Update settings in database
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Configure sync preferences and Google Drive settings</p>
      </div>

      <div className="space-y-8">
        {/* Google Drive Folder Selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Google Drive Folder</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Folder
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Select a folder...</option>
                <option>/Fathom Transcripts</option>
                <option>/Documents/Calls</option>
                <option>/Work/Meetings</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Choose where transcripts will be uploaded in your Google Drive
              </p>
            </div>
          </div>
        </div>

        {/* Sync Preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sync Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="auto-sync" className="mr-3" defaultChecked />
              <label htmlFor="auto-sync" className="text-sm font-medium text-gray-700">
                Enable automatic sync (every 6 hours)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sync-metadata" className="mr-3" defaultChecked />
              <label htmlFor="sync-metadata" className="text-sm font-medium text-gray-700">
                Include meeting metadata in filename
              </label>
            </div>
          </div>
        </div>

        {/* Duplicate Handling */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Duplicate Handling</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="radio" id="skip" name="duplicates" className="mr-3" defaultChecked />
              <label htmlFor="skip" className="text-sm font-medium text-gray-700">
                Skip duplicates (recommended)
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="overwrite" name="duplicates" className="mr-3" />
              <label htmlFor="overwrite" className="text-sm font-medium text-gray-700">
                Overwrite existing files
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="rename" name="duplicates" className="mr-3" />
              <label htmlFor="rename" className="text-sm font-medium text-gray-700">
                Create new file with timestamp
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}