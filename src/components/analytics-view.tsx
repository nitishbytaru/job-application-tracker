"use client";

import { useApplicationStore } from "@/store/use-application-store";
import { STATUS_LABELS, STATUS_COLORS } from "@/types";
import type { ApplicationStatus } from "@/types";

const STATUSES: ApplicationStatus[] = [
  "applied", "screening", "interviewing", "offer", "rejected", "withdrawn",
];

export default function AnalyticsView() {
  const { applications, getStatusCounts } = useApplicationStore();
  const counts = getStatusCounts();
  const total = applications.length;

  const responseRate = total > 0
    ? Math.round(((total - (counts.applied ?? 0)) / total) * 100)
    : 0;

  const offerRate = total > 0
    ? Math.round(((counts.offer ?? 0) / total) * 100)
    : 0;

  const rejectionRate = total > 0
    ? Math.round(((counts.rejected ?? 0) / total) * 100)
    : 0;

  // Find the max count for scaling bars
  const maxCount = Math.max(...STATUSES.map((s) => counts[s] ?? 0), 1);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
      <p className="text-sm text-gray-500 mb-8">
        Track your progress and application metrics.
      </p>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Response Rate</p>
          <p className="text-4xl font-bold text-emerald-600">{responseRate}%</p>
          <p className="text-xs text-gray-400 mt-1">
            {total - (counts.applied ?? 0)} responses out of {total}
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Offer Rate</p>
          <p className="text-4xl font-bold text-blue-600">{offerRate}%</p>
          <p className="text-xs text-gray-400 mt-1">
            {counts.offer ?? 0} offer{(counts.offer ?? 0) !== 1 ? "s" : ""} out of {total}
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Rejection Rate</p>
          <p className="text-4xl font-bold text-red-500">{rejectionRate}%</p>
          <p className="text-xs text-gray-400 mt-1">
            {counts.rejected ?? 0} rejection{(counts.rejected ?? 0) !== 1 ? "s" : ""} out of {total}
          </p>
        </div>
      </div>

      {/* Status Distribution Bar Chart */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm mb-8">
        <div className="space-y-4">
          {STATUSES.map((status) => {
            const count = counts[status] ?? 0;
            const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const color = STATUS_COLORS[status];
            return (
              <div key={status} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 w-28 shrink-0">
                  {STATUS_LABELS[status]}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 flex items-center pl-3"
                    style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%`, backgroundColor: color }}
                  >
                    {count > 0 && (
                      <span className="text-xs font-bold text-white">{count}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Timeline */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h2>
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        {applications.length === 0 ? (
          <p className="text-gray-400 text-sm">No applications to display.</p>
        ) : (
          <div className="space-y-3">
            {[...applications]
              .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
              .map((app) => (
                <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[app.status] }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{app.company}</p>
                    <p className="text-xs text-gray-500 truncate">{app.role}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {new Date(app.dateApplied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
