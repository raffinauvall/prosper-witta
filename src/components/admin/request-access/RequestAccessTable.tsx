"use client";

import { useEffect, useState } from "react";
import { getRequestAccess, deleteRequestAccess } from "@/lib/api/admin/request-access";
import { AccessRequest } from "@/lib/types";
import { normalizeArray } from "utils/helper";
import StatusBadge from "./StatusBadge";
import toast, { Toaster } from "react-hot-toast";

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

  const handleDelete = async (id: string) => {
  const ok = confirm("Yakin mau hapus request ini?");
  if (!ok) return;

  try {
    await deleteRequestAccess(id);

    setData((prev) => prev.filter((item) => item.id !== id));

    toast.success("Delete berhasil!"); // 🔥 toast feedback
  } catch (err: any) {
    toast.error(err?.message || "Delete gagal");
  }
};

  if (loading)
    return <div className="p-6 text-center text-gray-500">Loading request access...</div>;

  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  if (data.length === 0)
    return <div className="p-6 text-center text-gray-500">No access requests found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Company</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-3">{item.name}</td>
              <td className="px-6 py-3">{item.company || "-"}</td>
              <td className="px-6 py-3">{item.email}</td>
              <td className="px-6 py-3">{item.products?.name || "-"}</td>
              <td className="px-6 py-3 text-xs uppercase">{item.type}</td>
              <td className="px-6 py-3">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-3">
                {new Date(item.created_at).toLocaleDateString("id-ID")}
              </td>

              {/* 🔥 DELETE BUTTON */}
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
