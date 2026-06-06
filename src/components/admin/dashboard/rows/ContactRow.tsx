import { Td } from "../../../TableHelpers";
import { Contact } from "@/lib/types";

export function ContactRow({ item }: { item: Contact }) {
  return (
    <>
      <Td className="font-medium text-gray-900">{item.name}</Td>
      <Td className="whitespace-nowrap">{item.email}</Td>
      <Td className="max-w-[280px] truncate">{item.message}</Td>
      <Td className="whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</Td>
    </>
  );
}
