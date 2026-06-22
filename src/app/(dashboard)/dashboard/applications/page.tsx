import Link from "next/link";

const jobs = [
  {
    id: 1,
    company: "Google",
  },
  {
    id: 2,
    company: "Microsoft",
  },
  {
    id: 3,
    company: "Amazon",
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Applications
      </h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/dashboard/applications/${job.id}`}
            className="block border p-4 rounded"
          >
            {job.company}
          </Link>
        ))}
      </div>
    </>
  );
}