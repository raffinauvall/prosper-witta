"use client";

import { useEffect, useState } from "react";
import { getRequestAccess } from "@/lib/api/admin/request-access";
import { AccessRequest } from "@/lib/types";

export default function RequestAccessTable() {
  const [data, setData] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRequestAccess()
      .then(setData)
      .catch((err: any) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow p-6 text-sm text-gray-500">
        Loading request access...
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b font-semibold">
        Document Access Requests
      </div>

      <div className="overflow-x-auto max-h-[400px]">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <Th>Name</Th>
              <Th>Company</Th>
              <Th>Email</Th>
              <Th>Product</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <Td colSpan={7} className="text-center text-gray-500 py-6">
                  No access requests found
                </Td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <Td>{item.name}</Td>
                  <Td>{item.company || "-"}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.products?.name || "-"}</Td>
                  <Td className="uppercase">{item.type}</Td>
                  <Td>
                    <StatusBadge status={item.status} />
                  </Td>
                  <Td>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================== Helpers ================== */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-3 text-left font-medium text-gray-600 whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({
  children,
  colSpan,
  className = "",
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
}) {
  return (
    <td colSpan={colSpan} className={`p-3 ${className}`}>
      {children}
    </td>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
