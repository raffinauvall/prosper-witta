"use client";

import { useEffect, useState } from "react";

import { RequestSampleRow, AccessRequest, News, Contact } from "@/lib/types";
import { getRequestSample } from "@/lib/api/admin/request-sample";
import { getRequestAccess } from "@/lib/api/admin/request-access";
import { fetchAdminProducts } from "@/lib/api/products/products";
import { getNews } from "@/lib/api/admin/news";
import { getContact } from "@/lib/api/admin/contact";

import { DashboardCard } from "./DashboardCard";
import { DashboardTable } from "./DashboardTable";
import { normalizeArray } from "utils/helper";

export default function DashboardMain() {
  const [loading, setLoading] = useState(true);

  // raw data
  const [products, setProducts] = useState<any[]>([]);
  const [requestSamples, setRequestSamples] = useState<RequestSampleRow[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // KPI
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSamples, setTotalSamples] = useState(0);
  const [totalAccessRequests, setTotalAccessRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  const limit = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      // Products
      const prodsRes = await fetchAdminProducts();
      const productsArr = normalizeArray(prodsRes);
      setProducts(productsArr);
      setTotalProducts(productsArr.length);

      // ✅ Request Samples (SPECIAL)
      const sampleRes = await getRequestSample(1, limit);
      setRequestSamples(sampleRes.data);
      setTotalSamples(
        typeof sampleRes.total === "number"
          ? sampleRes.total
          : sampleRes.data.length
      );

      console.log("requestSamples:", sampleRes.data);


      // Access Requests
      const accessRes = await getRequestAccess();
      const accessArr = normalizeArray<AccessRequest>(accessRes);
      setAccessRequests(accessArr);
      setTotalAccessRequests(accessArr.length);
      setPendingRequests(
        accessArr.filter((r: AccessRequest) => r.status === "pending").length
      );

      // Contacts
      const contactRes = await getContact();
      const contactArr = normalizeArray<Contact>(contactRes);
      setContacts(contactArr);
      setTotalContacts(contactArr.length);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <DashboardCard title="Total Products" value={totalProducts} />
        <DashboardCard title="Request Samples" value={totalSamples} />
        <DashboardCard title="Access Requests" value={totalAccessRequests} />
        <DashboardCard title="Pending Requests" value={pendingRequests} />
        <DashboardCard title="Contact Inquiries" value={totalContacts} />
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardTable
          title="Recent Request Samples"
          loading={loading}
          data={requestSamples}
          type="sample"
        />

        <DashboardTable
          title="Recent Access Requests"
          loading={loading}
          data={accessRequests}
          type="access"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardTable
          title="Recent Contact Inquiries"
          loading={loading}
          data={contacts}
          type="contact"
        />
      </div>
    </div>
  );
}
