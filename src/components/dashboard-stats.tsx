"use client";

import { useApplicationStore } from "@/store/use-application-store";
import { STATUS_LABELS, STATUS_COLORS } from "@/types";
import type { ApplicationStatus } from "@/types";

const STATUSES: ApplicationStatus[] = [
  "applied", "screening", "interviewing", "offer", "rejected", "withdrawn",
];

export default function DashboardStats() {
  const { applications, getStatusCounts } = useApplicationStore();
  const counts = getStatusCounts();
  const totalApps = applications.length;
  const activeApps = totalApps - (counts.rejected ?? 0) - (counts.withdrawn ?? 0);
  const responseRate = totalApps > 0
    ? Math.round(((totalApps - (counts.applied ?? 0)) / totalApps) * 100)
    : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
      <p className="text-sm text-gray-500 mb-8">Summary of your job search progress.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900">{totalApps}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Active Pipelines</p>
          <p className="text-3xl font-bold text-gray-900">{activeApps}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Response Rate</p>
          <p className="text-3xl font-bold text-gray-900">{responseRate}%</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {STATUSES.map((status) => {
          const count = counts[status] ?? 0;
          const color = STATUS_COLORS[status];
          return (
            <div key={status} className="border rounded-xl p-4 bg-white shadow-sm" style={{ borderColor: `${color}40` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs font-medium text-gray-500">{STATUS_LABELS[status]}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color }}>{count}</p>
            </div>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-400 text-sm">No applications yet.</p>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900">{app.company}</td>
                  <td className="px-5 py-3 text-gray-600">{app.role}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ color: STATUS_COLORS[app.status], backgroundColor: `${STATUS_COLORS[app.status]}15` }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[app.status] }} />
                      {STATUS_LABELS[app.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(app.dateApplied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
