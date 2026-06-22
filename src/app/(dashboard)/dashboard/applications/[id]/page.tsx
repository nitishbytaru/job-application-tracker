import { notFound } from "next/navigation";

const jobs = [
  {
    id: "1",
    company: "Google",
  },
  {
    id: "2",
    company: "Microsoft",
  },
  {
    id: "3",
    company: "Amazon",
  },
];

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = jobs.find(
    (j) => j.id === id
  );

  if (!job) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {job.company}
      </h1>

      <p className="mt-4">
        Application ID: {job.id}
      </p>
    </div>
  );
}