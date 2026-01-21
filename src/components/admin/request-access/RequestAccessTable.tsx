"use client";

import { useEffect, useState } from "react";
import { getRequestAccess } from "@/lib/api/admin/request-access";
import { AccessRequest } from "@/lib/types";
import { normalizeArray } from "utils/helper";
import StatusBadge from "./StatusBadge";

export default function RequestAccessTable() {
  const [data, setData] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getRequestAccess();
        const rows = normalizeArray<AccessRequest>(res);
        setData(rows);
      } catch (err: any) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading request access...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        Error: {error}
      </div>
    );

  if (data.length === 0)
    return (
      <div className="p-6 text-center text-gray-500">
        No access requests found.
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Company
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Email
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Product
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Type
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Date
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                {item.name}
              </td>

              <td className="px-6 py-3 text-gray-700">
                {item.company || "-"}
              </td>

              <td className="px-6 py-3 text-gray-700">
                {item.email}
              </td>

              <td className="px-6 py-3 text-gray-700">
                {item.products?.name || "-"}
              </td>

              <td className="px-6 py-3 text-xs uppercase text-gray-500">
                {item.type}
              </td>

              <td className="px-6 py-3">
                <StatusBadge status={item.status} />
              </td>

              <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
