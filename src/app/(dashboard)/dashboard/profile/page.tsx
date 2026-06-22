export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-gray-600 mb-6">
        Manage your personal information and resume. This demonstrates a static dashboard page.
      </p>

      <div className="border rounded-lg bg-white p-6 max-w-lg shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Name</label>
          <p className="text-lg font-semibold">Alex Developer</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Email</label>
          <p className="text-lg font-semibold">alex.dev@example.com</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Skills</label>
          <div className="flex gap-2 mt-1">
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">React</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">Next.js</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
