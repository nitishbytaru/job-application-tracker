"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useApplicationStore } from "@/store/use-application-store";
import { STATUS_LABELS } from "@/types";
import type { ApplicationStatus } from "@/types";
import StatusBadge from "@/components/status-badge";
import ApplicationForm from "@/components/application-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} application{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button
          onClick={() => {
            setEditId(undefined);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <span className="text-lg leading-none">+</span> Add Application
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Search by company, role, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
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
            <Button
              key={s}
              variant={isActive ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilterStatus(s)}
              className="text-xs"
            >
              {s === "all" ? "All" : STATUS_LABELS[s]} ({count})
            </Button>
          );
        })}
      </div>

      {/* Applications Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground text-lg mb-1">No applications found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or filter, or add a new application.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {app.company}
                    </Link>
                  </TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(app.dateApplied).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.location ?? "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 lg:px-3"
                        onClick={() => handleEdit(app.id)}
                      >
                        Edit
                      </Button>
                      {deleteConfirm === app.id ? (
                        <div className="flex gap-1">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 px-2 lg:px-3"
                            onClick={() => handleDelete(app.id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 px-2 lg:px-3"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 lg:px-3 text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirm(app.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
