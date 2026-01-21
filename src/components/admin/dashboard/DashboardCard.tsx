export function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col items-center hover:shadow-md transition">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}
