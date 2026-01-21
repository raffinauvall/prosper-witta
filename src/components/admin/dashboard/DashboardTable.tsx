import { Th, Td } from "../../TableHelpers";
import { SampleRow } from "./rows/SampleRow";
import { AccessRow } from "./rows/AccessRow";
import { ContactRow } from "./rows/ContactRow";

export function DashboardTable({
  title,
  data,
  loading,
  type,
}: {
  title: string;
  data: any;
  loading: boolean;
  type: "sample" | "access" | "contact";
}) {
  const rows = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold mb-4 text-gray-700">{title}</h2>

      <div className="overflow-auto max-h-[260px]">
        <table className="w-full text-sm min-w-[500px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {type === "sample" && (
                <>
                  <Th>Name</Th><Th>Company</Th><Th>Email</Th><Th>Phone</Th><Th>Product</Th><Th>Date</Th>
                </>
              )}
              {type === "access" && (
                <>
                  <Th>Name</Th><Th>Company</Th><Th>Email</Th><Th>Purpose</Th><Th>Status</Th><Th>Date</Th>
                </>
              )}
              {type === "contact" && (
                <>
                  <Th>Name</Th><Th>Email</Th><Th>Message</Th><Th>Date</Th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={type === "contact" ? 4 : 6} className="text-center">
                  Loading...
                </Td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <Td colSpan={type === "contact" ? 4 : 6} className="text-center">
                  No data
                </Td>
              </tr>
            ) : (
              rows.map((item) => (
                <tr key={item.id} className="border-t">
                  {type === "sample" && <SampleRow item={item} />}
                  {type === "access" && <AccessRow item={item} />}
                  {type === "contact" && <ContactRow item={item} />}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
