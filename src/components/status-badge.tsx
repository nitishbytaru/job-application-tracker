"use client";

import { STATUS_LABELS, STATUS_COLORS } from "@/types";
import type { ApplicationStatus } from "@/types";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        color,
        backgroundColor: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
