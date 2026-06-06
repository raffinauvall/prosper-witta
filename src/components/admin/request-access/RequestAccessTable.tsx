"use client";

import { useEffect, useState } from "react";
import { getRequestAccess, deleteRequestAccess } from "@/lib/api/admin/request-access";
import { AccessRequest } from "@/lib/types";
import { normalizeArray } from "utils/helper";
import StatusBadge from "./StatusBadge";
import toast from "react-hot-toast";
import { RefreshCw, Trash2 } from "lucide-react";

export default function RequestAccessTable() {
  const [data, setData] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getRequestAccess();
      const rows = normalizeArray<AccessRequest>(res);
      setData(rows);
      setLastUpdated(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Yakin mau hapus request ini?");
    if (!ok) return;

    try {
      await deleteRequestAccess(id);

      setData((prev) => prev.filter((item) => item.id !== id));

      toast.success("Delete berhasil!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete gagal";
      toast.error(message);
    }
  };

  const pendingCount = data.filter((item) => item.status === "pending").length;
  const approvedCount = data.filter((item) => item.status === "approved").length;
  const rejectedCount = data.filter((item) => item.status === "rejected").length;

  if (loading)
    return (
      <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="h-6 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="space-y-3 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      </section>
    );

  if (error)
    return (
      <section className="rounded-lg border border-rose-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-rose-700">Request access gagal dimuat</p>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
        <button
          onClick={load}
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </section>
    );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Request Access</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review document access requests and remove stale entries.
          </p>
        </div>

        <button
          onClick={load}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <SummaryCard label="Total" value={data.length} />
        <SummaryCard label="Pending" value={pendingCount} tone="amber" />
        <SummaryCard label="Approved" value={approvedCount} tone="green" />
        <SummaryCard label="Rejected" value={rejectedCount} tone="rose" />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Recent Requests</h3>
            <p className="mt-1 text-xs text-gray-500">
              {lastUpdated
                ? `Last updated ${lastUpdated.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Not updated yet"}
            </p>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            No access requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead align="center">Action</TableHead>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-gray-700">{item.company || "-"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">{item.email}</td>
                    <td className="px-6 py-4 text-gray-700">{item.products?.name || "-"}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase text-slate-700">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-rose-600 hover:bg-rose-50"
                        aria-label={`Delete request from ${item.name}`}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <th
      className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function SummaryCard({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: number;
  tone?: "slate" | "amber" | "green" | "rose";
}) {
  const toneClass = {
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${toneClass[tone]}`}>
          {value}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
