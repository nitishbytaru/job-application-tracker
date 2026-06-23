"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApplicationStore } from "@/store/use-application-store";
import StatusBadge from "@/components/status-badge";
import ApplicationForm from "@/components/application-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ApplicationDetailProps {
  id: string;
}

export default function ApplicationDetail({ id }: ApplicationDetailProps) {
  const router = useRouter();
  const { getApplicationById, deleteApplication } = useApplicationStore();
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const app = getApplicationById(id);

  if (!app) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-2">Application Not Found</h1>
        <p className="text-muted-foreground mb-4">This application may have been deleted.</p>
        <Link href="/dashboard/applications" className={buttonVariants({ variant: "link" })}>
          ← Back to Applications
        </Link>
      </div>
    );
  }

  if (!isMounted) {
    return null;
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
      <Link href="/dashboard/applications" className={buttonVariants({ variant: "link", className: "px-0 mb-4" })}>
        ← Back to Applications
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{app.company}</h1>
          <p className="text-muted-foreground mt-1">{app.role}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowEdit(true)}>
            Edit
          </Button>
          {showDeleteConfirm ? (
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          {infoItems.map((item) => (
            <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="text-sm font-medium text-muted-foreground sm:w-32 shrink-0">{item.label}</span>
              {item.badge ? (
                <StatusBadge status={app.status} />
              ) : item.isLink && item.value ? (
                <a href={item.value} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all">
                  {item.value}
                </a>
              ) : (
                <span className="text-sm">{item.value ?? "—"}</span>
              )}
            </div>
          ))}

          {app.notes && (
            <div className="pt-4 border-t border-border">
              <span className="text-sm font-medium text-muted-foreground block mb-2">Notes</span>
              <p className="text-sm whitespace-pre-wrap bg-muted rounded-lg p-4">{app.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showEdit && (
        <ApplicationForm onClose={() => setShowEdit(false)} editId={id} />
      )}
    </div>
  );
}
