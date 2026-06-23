import ApplicationDetail from "@/components/application-detail";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ApplicationDetail id={id} />;
}