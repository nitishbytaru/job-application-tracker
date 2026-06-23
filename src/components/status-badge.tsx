"use client";

import { STATUS_LABELS, STATUS_COLORS } from "@/types";
import type { ApplicationStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];

  return (
    <Badge
      variant="outline"
      className="gap-1.5 font-semibold"
      style={{
        color,
        backgroundColor: `${color}15`,
        borderColor: `${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {STATUS_LABELS[status]}
    </Badge>
  );
}
