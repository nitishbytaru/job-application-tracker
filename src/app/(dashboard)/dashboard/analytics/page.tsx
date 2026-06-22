export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>
      <p className="text-gray-600 mb-6">
        Track your progress and application metrics here. This is a basic route demonstrating static page rendering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Response Rate</h2>
          <p className="text-4xl font-bold text-green-600">33.3%</p>
          <p className="text-sm text-gray-500 mt-1">4 responses out of 12 applications</p>
        </div>

        <div className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Interviews Scheduled</h2>
          <p className="text-4xl font-bold text-blue-600">2</p>
          <p className="text-sm text-gray-500 mt-1">Next: June 24th, 2026</p>
        </div>
      </div>
    </div>
  );
}
