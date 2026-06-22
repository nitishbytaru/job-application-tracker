export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600 mb-6">
        Adjust your notification preferences and app settings.
      </p>

      <div className="border rounded-lg bg-white p-6 max-w-lg shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-3">Notification Preferences</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              Email me when application status updates
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              Weekly summary of job hunt statistics
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">Theme</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border rounded text-sm bg-gray-100 font-medium">Light</button>
            <button className="px-3 py-1.5 border rounded text-sm text-gray-400 cursor-not-allowed" disabled>Dark (Disabled)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
