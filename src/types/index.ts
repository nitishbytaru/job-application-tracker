export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interviewing"
  | "offer"
  | "rejected"
  | "withdrawn";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string; // ISO date string
  salary?: string;
  location?: string;
  notes?: string;
  url?: string;
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  screening: "Screening",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: "#6366f1",      // indigo
  screening: "#f59e0b",    // amber
  interviewing: "#3b82f6", // blue
  offer: "#10b981",        // emerald
  rejected: "#ef4444",     // red
  withdrawn: "#6b7280",    // gray
};
