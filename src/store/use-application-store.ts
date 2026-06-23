import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JobApplication, ApplicationStatus } from "@/types";

interface ApplicationState {
  applications: JobApplication[];
  filterStatus: ApplicationStatus | "all";
  searchQuery: string;

  // Actions
  addApplication: (app: Omit<JobApplication, "id">) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;
  setFilterStatus: (status: ApplicationStatus | "all") => void;
  setSearchQuery: (query: string) => void;

  // Derived
  getFilteredApplications: () => JobApplication[];
  getApplicationById: (id: string) => JobApplication | undefined;
  getStatusCounts: () => Record<ApplicationStatus | "all", number>;
}

const SEED_DATA: JobApplication[] = [
  {
    id: "1",
    company: "Google",
    role: "Senior Frontend Engineer",
    status: "interviewing",
    dateApplied: "2026-06-01",
    salary: "$180,000 - $250,000",
    location: "Mountain View, CA",
    notes: "Passed phone screen. On-site scheduled for June 28th.",
    url: "https://careers.google.com",
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Software Engineer II",
    status: "applied",
    dateApplied: "2026-06-10",
    salary: "$150,000 - $200,000",
    location: "Redmond, WA (Hybrid)",
    notes: "Applied via referral from a friend.",
  },
  {
    id: "3",
    company: "Amazon",
    role: "Frontend Developer",
    status: "screening",
    dateApplied: "2026-06-05",
    salary: "$140,000 - $190,000",
    location: "Seattle, WA",
    notes: "Recruiter reached out. OA sent.",
  },
  {
    id: "4",
    company: "Stripe",
    role: "Full Stack Engineer",
    status: "offer",
    dateApplied: "2026-05-15",
    salary: "$170,000 - $220,000",
    location: "San Francisco, CA (Remote OK)",
    notes: "Offer received! Deadline to respond: June 30th.",
    url: "https://stripe.com/jobs",
  },
  {
    id: "5",
    company: "Meta",
    role: "React Engineer",
    status: "rejected",
    dateApplied: "2026-05-20",
    salary: "$160,000 - $230,000",
    location: "Menlo Park, CA",
    notes: "Rejected after system design round.",
  },
  {
    id: "6",
    company: "Netflix",
    role: "UI Engineer",
    status: "withdrawn",
    dateApplied: "2026-05-28",
    salary: "$200,000 - $300,000",
    location: "Los Gatos, CA",
    notes: "Withdrew after accepting another offer.",
  },
];

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      applications: SEED_DATA,
      filterStatus: "all",
      searchQuery: "",

      addApplication: (app) =>
        set((state) => ({
          applications: [
            {
              ...app,
              id: crypto.randomUUID(),
            },
            ...state.applications,
          ],
        })),

      updateApplication: (id, updates) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updates } : app
          ),
        })),

      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),

      setFilterStatus: (status) => set({ filterStatus: status }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      getFilteredApplications: () => {
        const { applications, filterStatus, searchQuery } = get();
        let filtered = applications;

        if (filterStatus !== "all") {
          filtered = filtered.filter((app) => app.status === filterStatus);
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (app) =>
              app.company.toLowerCase().includes(q) ||
              app.role.toLowerCase().includes(q) ||
              (app.location && app.location.toLowerCase().includes(q))
          );
        }

        return filtered;
      },

      getApplicationById: (id) => {
        return get().applications.find((app) => app.id === id);
      },

      getStatusCounts: () => {
        const apps = get().applications;
        const counts: Record<string, number> = { all: apps.length };
        for (const app of apps) {
          counts[app.status] = (counts[app.status] || 0) + 1;
        }
        return counts as Record<ApplicationStatus | "all", number>;
      },
    }),
    {
      name: "job-applications-storage",
    }
  )
);
