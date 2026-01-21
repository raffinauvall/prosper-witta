import { Td } from "../../../TableHelpers";
import { AccessRequest } from "@/lib/types";

export function AccessRow({ item }: { item: AccessRequest }) {
  return (
    <>
      <Td>{item.name}</Td>
      <Td>{item.company}</Td>
      <Td>{item.email}</Td>
      <Td>{item.purpose}</Td>
      <Td>
        <span
          className={`px-2 py-1 rounded ${
            item.status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : item.status === "approved"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </Td>
      <Td>{new Date(item.created_at).toLocaleDateString()}</Td>
    </>
  );
}
