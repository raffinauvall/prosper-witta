import { Td } from "../../../TableHelpers";
import { RequestSampleRow } from "@/lib/types";

export function SampleRow({ item }: { item: RequestSampleRow }) {
  return (
    <>
      <Td className="font-medium text-gray-900">{item.full_name}</Td>
      <Td>{item.company_name || "-"}</Td>
      <Td className="whitespace-nowrap">{item.email}</Td>
      <Td className="whitespace-nowrap">{item.phone}</Td>
      <Td>{item.products?.name || "-"}</Td>
      <Td className="whitespace-nowrap">{new Date(item.requested_at).toLocaleDateString()}</Td>
    </>
  );
}
