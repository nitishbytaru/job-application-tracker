"use client";

import { useState, useEffect } from "react";

import { useApplicationStore } from "@/store/use-application-store";
import { STATUS_LABELS, STATUS_COLORS } from "@/types";
import type { ApplicationStatus } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/status-badge";

const STATUSES: ApplicationStatus[] = [
  "applied", "screening", "interviewing", "offer", "rejected", "withdrawn",
];

export default function DashboardStats() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { applications, getStatusCounts } = useApplicationStore();
  const counts = getStatusCounts();
  const totalApps = applications.length;
  const activeApps = totalApps - (counts.rejected ?? 0) - (counts.withdrawn ?? 0);
  const responseRate = totalApps > 0
    ? Math.round(((totalApps - (counts.applied ?? 0)) / totalApps) * 100)
    : 0;

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
      <p className="text-sm text-muted-foreground mb-8">Summary of your job search progress.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Applications</p>
            <p className="text-3xl font-bold">{totalApps}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Pipelines</p>
            <p className="text-3xl font-bold">{activeApps}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Response Rate</p>
            <p className="text-3xl font-bold">{responseRate}%</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-semibold mb-4">Status Breakdown</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {STATUSES.map((status) => {
          const count = counts[status] ?? 0;
          const color = STATUS_COLORS[status];
          return (
            <Card key={status} style={{ borderColor: `${color}40` }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium text-muted-foreground">{STATUS_LABELS[status]}</span>
                </div>
                <p className="text-2xl font-bold" style={{ color }}>{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
      {applications.length === 0 ? (
        <p className="text-muted-foreground text-sm">No applications yet.</p>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.slice(0, 5).map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(app.dateApplied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
