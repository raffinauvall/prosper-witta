import { ProductTdsProps, AccessStatus } from "../../lib/types/types"

export default function ProductTds({
  productId,
  status,
  onRequest,
  onView,
}: ProductTdsProps) {
  return (
    <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Technical Data Sheet
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        Dokumen ini memberikan informasi teknis terkait kinerja produk,
        aplikasi, serta panduan penanganan dan penyimpanan.
      </p>

      {/* STATUS INFO */}
      {status === "none" && (
        <div className="mb-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          🔒 Access to the full document is restricted.
        </div>
      )}

      {status === "pending" && (
        <div className="mb-4 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-700">
          ⏳ Your request is pending approval.
        </div>
      )}

      {status === "rejected" && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">
          ❌ Your request was rejected.
        </div>
      )}

      {status === "approved" && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-xs text-green-700">
          ✅ Access approved. You can view the document.
        </div>
      )}

      {/* ACTION */}
      {status === "none" && (
        <button
          onClick={() => onRequest("tds")}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Request Access
        </button>
      )}

      {status === "pending" && (
        <button
          disabled
          className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-white"
        >
          Pending Approval
        </button>
      )}

      {status === "approved" && (
        <button
          onClick={onView}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          View Document
        </button>
      )}

      {status === "rejected" && (
        <button
          onClick={() => onRequest("tds")}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Request Again
        </button>
      )}
    </div>
  );
}
