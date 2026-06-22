export default async function DashboardPage() {
  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          Total Applications: 12
        </div>

        <div className="border p-4 rounded">
          Interviews: 4
        </div>

        <div className="border p-4 rounded">
          Offers: 1
        </div>
      </div>
    </>
  );
}