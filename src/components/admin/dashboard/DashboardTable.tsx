import { Th, Td } from "../../TableHelpers";
import { SampleRow } from "./rows/SampleRow";
import { AccessRow } from "./rows/AccessRow";
import { ContactRow } from "./rows/ContactRow";
import type { AccessRequest, Contact, RequestSampleRow } from "@/lib/types";
import { Eye, X } from "lucide-react";
import { useState } from "react";

type DashboardTableProps =
  | {
      title: string;
      data: RequestSampleRow[];
      loading: boolean;
      type: "sample";
    }
  | {
      title: string;
      data: AccessRequest[];
      loading: boolean;
      type: "access";
    }
  | {
      title: string;
      data: Contact[];
      loading: boolean;
      type: "contact";
    };

const columnCount = {
  sample: 6,
  access: 6,
  contact: 5,
};

export function DashboardTable({
  title,
  data,
  loading,
  type,
}: DashboardTableProps) {
  const rows = Array.isArray(data) ? data : [];
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const renderRows = () => {
    if (type === "sample") {
      return (rows as RequestSampleRow[]).map((item) => (
        <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
          <SampleRow item={item} />
        </tr>
      ));
    }

    if (type === "access") {
      return (rows as AccessRequest[]).map((item) => (
        <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
          <AccessRow item={item} />
        </tr>
      ));
    }

    return (rows as Contact[]).map((item) => (
      <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
        <ContactRow item={item} />
        <Td className="text-right">
          <button
            onClick={() => setSelectedContact(item)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
            aria-label={`View message from ${item.name}`}
            title="View detail"
          >
            <Eye className="h-4 w-4" />
          </button>
        </Td>
      </tr>
    ));
  };

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="max-h-[320px] overflow-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {type === "sample" && (
                <>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Product</Th>
                  <Th>Date</Th>
                </>
              )}
              {type === "access" && (
                <>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Email</Th>
                  <Th>Purpose</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </>
              )}
              {type === "contact" && (
                <>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Message</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={columnCount[type]} className="text-center text-gray-500">
                  Loading...
                </Td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <Td colSpan={columnCount[type]} className="text-center text-gray-500">
                  No data
                </Td>
              </tr>
            ) : (
              renderRows()
            )}
          </tbody>
        </table>
      </div>
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
              <div>
                <h4 className="text-base font-semibold text-gray-900">Contact Message</h4>
                <p className="mt-1 text-sm text-gray-500">{selectedContact.email}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                aria-label="Close detail"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Name</p>
                <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Date</p>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedContact.created_at).toLocaleString("id-ID")}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Message</p>
                <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-800">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
