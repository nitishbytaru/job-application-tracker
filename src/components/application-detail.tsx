"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApplicationStore } from "@/store/use-application-store";
import { STATUS_LABELS } from "@/types";
import type { ApplicationStatus } from "@/types";
import StatusBadge from "@/components/status-badge";
import ApplicationForm from "@/components/application-form";

interface ApplicationDetailProps {
  id: string;
}

export default function ApplicationDetail({ id }: ApplicationDetailProps) {
  const router = useRouter();
  const { getApplicationById, deleteApplication } = useApplicationStore();
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const app = getApplicationById(id);

  if (!app) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Not Found</h1>
        <p className="text-gray-500 mb-4">This application may have been deleted.</p>
        <Link href="/dashboard/applications" className="text-indigo-600 hover:underline text-sm">
          ← Back to Applications
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteApplication(id);
    router.push("/dashboard/applications");
  };

  const infoItems = [
    { label: "Role", value: app.role },
    { label: "Status", value: null, badge: true },
    { label: "Date Applied", value: new Date(app.dateApplied).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
    { label: "Salary Range", value: app.salary },
    { label: "Location", value: app.location },
    { label: "Job URL", value: app.url, isLink: true },
  ];

  return (
    <div>
      <Link href="/dashboard/applications" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4 inline-block">
        ← Back to Applications
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{app.company}</h1>
          <p className="text-gray-500 mt-1">{app.role}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowEdit(true)}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            Edit
          </button>
          {showDeleteConfirm ? (
            <div className="flex gap-2">
              <button onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                Confirm Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-6 space-y-5">
        {infoItems.map((item) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-sm font-medium text-gray-500 sm:w-32 shrink-0">{item.label}</span>
            {item.badge ? (
              <StatusBadge status={app.status} />
            ) : item.isLink && item.value ? (
              <a href={item.value} target="_blank" rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:underline break-all">
                {item.value}
              </a>
            ) : (
              <span className="text-sm text-gray-900">{item.value ?? "—"}</span>
            )}
          </div>
        ))}

        {app.notes && (
          <div className="pt-4 border-t">
            <span className="text-sm font-medium text-gray-500 block mb-2">Notes</span>
            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">{app.notes}</p>
          </div>
        )}
      </div>

      {showEdit && (
        <ApplicationForm onClose={() => setShowEdit(false)} editId={id} />
      )}
    </div>
  );
}
