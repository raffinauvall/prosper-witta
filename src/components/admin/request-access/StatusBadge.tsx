interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const map: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ${
        map[status] || "bg-gray-50 text-gray-600 ring-gray-200"
      }`}
    >
      {status}
    </span>
  );
}
