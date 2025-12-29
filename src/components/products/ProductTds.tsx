type ProductTdsProps = {
  productId: number;
  onRequest: (type: "tds") => void;
};

export default function ProductTds({
  productId,
  onRequest,
}: ProductTdsProps) {
  return (
    <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Technical Data Sheet (TDS)
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        Dokumen ini memberikan informasi teknis terkait kinerja produk,
        aplikasi, serta panduan penanganan dan penyimpanan.
      </p>

      <div className="mb-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
        🔒 Access to the full document is restricted.
      </div>

      <button
        onClick={() => onRequest("tds")}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Request Access
      </button>
    </div>
  );
}
