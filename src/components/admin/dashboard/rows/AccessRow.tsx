import { Td } from "../../../TableHelpers";
import { AccessRequest } from "@/lib/types";

const statusClass = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function AccessRow({ item }: { item: AccessRequest }) {
  return (
    <>
      <Td className="font-medium text-gray-900">{item.name}</Td>
      <Td>{item.company || "-"}</Td>
      <Td className="whitespace-nowrap">{item.email}</Td>
      <Td className="max-w-[220px] truncate">{item.purpose || "-"}</Td>
      <Td>
        <span
          className={`inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ${statusClass[item.status]}`}
        >
          {item.status}
        </span>
      </Td>
      <Td className="whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</Td>
    </>
  );
}
