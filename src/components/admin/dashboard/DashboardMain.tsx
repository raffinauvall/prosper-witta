"use client";

import { useEffect, useState } from "react";
import { FileText, Inbox, Mail, Package, RefreshCw, Timer } from "lucide-react";

import { RequestSampleRow, AccessRequest, Contact } from "@/lib/types";
import { getRequestSample } from "@/lib/api/admin/request-sample";
import { getRequestAccess } from "@/lib/api/admin/request-access";
import { fetchAdminProducts } from "@/lib/api/products/products";
import { getContact } from "@/lib/api/admin/contact";

import { DashboardCard } from "./DashboardCard";
import { DashboardTable } from "./DashboardTable";
import { normalizeArray } from "utils/helper";

export default function DashboardMain() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [requestSamples, setRequestSamples] = useState<RequestSampleRow[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSamples, setTotalSamples] = useState(0);
  const [totalAccessRequests, setTotalAccessRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  const limit = 5;

  const loadData = async () => {
    setLoading(true);
    setRefreshing(true);
    setError(null);
    try {
      const [productsResult, samplesResult, accessResult, contactsResult] =
        await Promise.allSettled([
          fetchAdminProducts(),
          getRequestSample(1, limit),
          getRequestAccess(),
          getContact(),
        ]);

      const failures: string[] = [];

      if (productsResult.status === "fulfilled") {
        const productsArr = normalizeArray(productsResult.value);
        setTotalProducts(productsArr.length);
      } else {
        failures.push("products");
      }

      if (samplesResult.status === "fulfilled") {
        setRequestSamples(samplesResult.value.data);
        setTotalSamples(
          typeof samplesResult.value.total === "number"
            ? samplesResult.value.total
            : samplesResult.value.data.length
        );
      } else {
        failures.push("request samples");
      }

      if (accessResult.status === "fulfilled") {
        const accessArr = normalizeArray<AccessRequest>(accessResult.value);
        setAccessRequests(accessArr);
        setTotalAccessRequests(accessArr.length);
        setPendingRequests(
          accessArr.filter((r: AccessRequest) => r.status === "pending").length
        );
      } else {
        failures.push("request access");
      }

      if (contactsResult.status === "fulfilled") {
        const contactArr = normalizeArray<Contact>(contactsResult.value);
        setContacts(contactArr);
        setTotalContacts(contactArr.length);
      } else {
        failures.push("contacts");
      }

      if (failures.length > 0) {
        setError(`Failed to load ${failures.join(", ")}.`);
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const cards = [
    { title: "Total Products", value: totalProducts, icon: Package, tone: "blue" as const },
    { title: "Request Samples", value: totalSamples, icon: Inbox, tone: "green" as const },
    { title: "Access Requests", value: totalAccessRequests, icon: FileText, tone: "slate" as const },
    { title: "Pending Requests", value: pendingRequests, icon: Timer, tone: "amber" as const },
    { title: "Contact Inquiries", value: totalContacts, icon: Mail, tone: "rose" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">
            Latest activity and operational totals.
          </p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-gray-400">
              Last updated{" "}
              {lastUpdated.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        <button
          onClick={loadData}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
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
