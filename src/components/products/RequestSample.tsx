"use client";

import { FlaskConical, Info } from "lucide-react";

type Props = {
  onRequestSample: () => void;
};

export default function RequestSampleWidget({ onRequestSample }: Props) {
  return (
    <div className="flex-col items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Icon */}
      <div className="flex items-center gap-5 mb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FlaskConical size={20} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">
          Request Product Sample
        </h3>
      </div>

      <p className="mb-3 text-sm text-gray-600">
        Ajukan permintaan sample produk untuk keperluan evaluasi dan
        pengujian internal.
      </p>

      <div className="mb-4 rounded-lg bg-gray-50 p-3 flex text-xs text-gray-500">
        <Info size={15} className="me-2" />
        Sample dikirim dalam kemasan <b className="ms-1">100ml</b>
      </div>

      <button
        onClick={onRequestSample}
        className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Request Sample
       
      </button>

    </div>
  );
}
