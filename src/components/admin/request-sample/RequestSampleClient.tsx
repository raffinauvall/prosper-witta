"use client";

import { useEffect, useState } from "react";
import { deleteRequestSample, getRequestSample } from "@/lib/api/admin/request-sample";
import { RequestSampleRow } from "@/lib/types";
import toast from "react-hot-toast";

export default function RequestSampleClient() {
  const [data, setData] = useState<RequestSampleRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const loadData = async (page: number) => {
    setLoading(true);
    try {
      const res = await getRequestSample(page, limit);
      setData(res.data);
      setTotal(res.total);
      setPage(res.page);
    } catch (err) {
      console.error(err);
      alert("Failed to load request samples");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);
    const handleDelete = async (id: string) => {
  const ok = confirm("Yakin mau hapus request ini?");
  if (!ok) return;

  try {
    await deleteRequestSample(id);

    setData((prev) => prev.filter((item) => item.id !== id));

    toast.success("Delete berhasil!"); // 🔥 toast feedback
  } catch (err: any) {
    toast.error(err?.message || "Delete gagal");
  }
};

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Sample Requests</h1>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <Th>Name</Th>
              <Th>Company</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Product</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={6} className="text-center py-4">
                  Loading...
                </Td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <Td colSpan={6} className="text-center py-4">
                  No data found
                </Td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t">
                  <Td>{item.full_name}</Td>
                  <Td>{item.company_name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.phone}</Td>
                  <Td>{item.products?.name}</Td>
                  <Td>{new Date(item.requested_at).toLocaleDateString()}</Td>
                                <Td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page <= 1 || loading}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}


function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`p-3 text-left font-medium text-gray-600 ${className}`.trim()}>
      {children}
    </th>
  );
}

function Td({ children, colSpan, className = "" }: { children: React.ReactNode; colSpan?: number; className?: string }) {
  return (
    <td colSpan={colSpan} className={`p-3 ${className}`.trim()}>
      {children}
    </td>
  );
}
