"use client";

import { useEffect, useState } from "react";
import { RequestSampleRow, AccessRequest } from "../../lib/types";
import { getRequestSample } from "../../lib/api/admin/request-sample";
import { getRequestAccess } from "../../lib/api/admin/request-access";
import { fetchAdminProducts } from "@/lib/api/products";

export default function DashboardMain() {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<any[]>([]);
  const [requestSamples, setRequestSamples] = useState<RequestSampleRow[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);

  // KPI
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSamples, setTotalSamples] = useState(0);
  const [totalAccessRequests, setTotalAccessRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  const limit = 5; // show latest 5

  const loadData = async () => {
    setLoading(true);
    try {
      const prods = await fetchAdminProducts();
      setProducts(prods);
      setTotalProducts(prods.length);

      const samplesRes = await getRequestSample(1, limit);
      setRequestSamples(samplesRes.data);
      setTotalSamples(samplesRes.total);

      const accessRes = await getRequestAccess();
      setAccessRequests(accessRes);
      setTotalAccessRequests(accessRes.length);
      setPendingRequests(accessRes.filter((r) => r.status === "pending").length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Products" value={totalProducts} />
        <Card title="Request Samples" value={totalSamples} />
        <Card title="Access Requests" value={totalAccessRequests} />
        <Card title="Pending Requests" value={pendingRequests} />
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TableSection
          title="Recent Request Samples"
          loading={loading}
          data={requestSamples}
          type="sample"
        />
        <TableSection
          title="Recent Access Requests"
          loading={loading}
          data={accessRequests}
          type="access"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-black text-white rounded-lg">Add Product</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">View All Samples</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">View All Access Requests</button>
      </div>
    </div>
  );
}

// ---------------- Card Component ----------------
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-center items-center">
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}

// ---------------- Table Section ----------------
function TableSection({
  title,
  data,
  loading,
  type,
}: {
  title: string;
  data: any[];
  loading: boolean;
  type: "sample" | "access";
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="overflow-auto max-h-[200px]">
        <table className="w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {type === "sample" ? (
                <>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Product</Th>
                  <Th>Date</Th>
                </>
              ) : (
                <>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Email</Th>
                  <Th>Purpose</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={6} className="text-center py-2">
                  Loading...
                </Td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <Td colSpan={6} className="text-center py-2">
                  No data found
                </Td>
              </tr>
            ) : (
              data.map((item: any) => (
                <tr key={item.id} className="border-t">
                  {type === "sample" ? (
                    <>
                      <Td>{item.full_name}</Td>
                      <Td>{item.company_name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.phone}</Td>
                      <Td>{item.products?.name}</Td>
                      <Td>{new Date(item.requested_at).toLocaleDateString()}</Td>
                    </>
                  ) : (
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
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- Table Helpers ----------------
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`p-2 text-left font-medium text-gray-600 ${className}`.trim()}>{children}</th>;
}

function Td({ children, colSpan, className = "" }: { children: React.ReactNode; colSpan?: number; className?: string }) {
  return (
    <td colSpan={colSpan} className={`p-2 ${className}`.trim()}>
      {children}
    </td>
  );
}
