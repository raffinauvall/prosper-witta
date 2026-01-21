import { Td } from "../../../TableHelpers";
import { Contact } from "@/lib/types";

export function ContactRow({ item }: { item: Contact }) {
  return (
    <>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.message}</Td>
      <Td>{new Date(item.created_at).toLocaleDateString()}</Td>
    </>
  );
}
