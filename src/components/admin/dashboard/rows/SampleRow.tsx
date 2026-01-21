import { Td } from "../../../TableHelpers";
import { RequestSampleRow } from "@/lib/types";

export function SampleRow({ item }: { item: RequestSampleRow }) {
  return (
    <>
      <Td>{item.full_name}</Td>
      <Td>{item.company_name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.phone}</Td>
      <Td>{item.products?.name}</Td>
      <Td>{new Date(item.requested_at).toLocaleDateString()}</Td>
    </>
  );
}
