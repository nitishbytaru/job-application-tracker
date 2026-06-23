"use client";

import { useState } from "react";
import Link from "next/link";
import { useApplicationStore } from "@/store/use-application-store";
import { STATUS_LABELS } from "@/types";
import type { ApplicationStatus } from "@/types";
import StatusBadge from "@/components/status-badge";
import ApplicationForm from "@/components/application-form";

const ALL_STATUSES: (ApplicationStatus | "all")[] = [
  "all",
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
];

export default function ApplicationList() {
  const {
    filterStatus,
    searchQuery,
    setFilterStatus,
    setSearchQuery,
    getFilteredApplications,
    getStatusCounts,
    deleteApplication,
  } = useApplicationStore();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = getFilteredApplications();
  const counts = getStatusCounts();

  const handleEdit = (id: string) => {
    setEditId(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteApplication(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filtered.length} application{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => {
            setEditId(undefined);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span className="text-lg leading-none">+</span>
          Add Application
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by company, role, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ALL_STATUSES.map((s) => {
          const isActive = filterStatus === s;
          const count = counts[s] ?? 0;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s]} ({count})
            </button>
          );
        })}
      </div>

      {/* Applications Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-400 text-lg mb-1">No applications found</p>
          <p className="text-gray-400 text-sm">
            Try adjusting your search or filter, or add a new application.
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date Applied</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {app.company}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{app.role}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {new Date(app.dateApplied).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {app.location ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(app.id)}
                        className="px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                      >
                        Edit
                      </button>
                      {deleteConfirm === app.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="px-2.5 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(app.id)}
                          className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <ApplicationForm
          onClose={() => {
            setShowForm(false);
            setEditId(undefined);
          }}
          editId={editId}
        />
      )}
    </div>
  );
}
