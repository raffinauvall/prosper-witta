import { useLanguage } from "@/context/LanguageContext";
import { ProductTdsProps } from "@/lib/types";

export default function ProductTds({
  status,
  onRequest,
  hasDocument,
  onView,
}: ProductTdsProps) {
  const { t } = useLanguage();
  const currentStatus = status.status;
  if (!hasDocument) {
    return (
      <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold leading-tight text-gray-900">
          Material Safety Data
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            MSDS
          </span>
        </h2>

        <StatusBox
          text={t("products.status.unavailable")} // tambahin di i18n
          className="bg-gray-50 text-gray-500"
        />
      </div>
    );
  }
  return (
    <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* TITLE */}
      <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold leading-tight text-gray-900">
        Technical Data
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          TDS
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {t("products.tds")}
      </p>

      {/* STATUS */}
      {currentStatus === "none" && (
        <StatusBox text={t("products.status.none")} />
      )}

      {currentStatus === "pending" && (
        <StatusBox
          text={t("products.status.pending")}
          className="bg-yellow-50 text-yellow-700"
        />
      )}

      {currentStatus === "rejected" && (
        <StatusBox
          text={t("products.status.rejected")}
          className="bg-red-50 text-red-700"
        />
      )}

      {currentStatus === "approved" && (
        <StatusBox
          text={t("products.status.approved")}
          className="bg-green-50 text-green-700"
        />
      )}

      {/* ACTION */}
      {currentStatus === "none" && (
        <PrimaryButton onClick={onRequest}>
          {t("products.button.none")}
        </PrimaryButton>
      )}

      {currentStatus === "pending" && (
        <DisabledButton>{t("products.button.pending")}</DisabledButton>
      )}

      {currentStatus === "approved" && (
        <PrimaryButton onClick={onView} color="green">
          {t("products.button.approved")}
        </PrimaryButton>
      )}

      {currentStatus === "rejected" && (
        <PrimaryButton onClick={onRequest}>
          {t("products.button.rejected")}
        </PrimaryButton>
      )}
    </div>
  );
}

/* ---------- UI ATOMS ---------- */

function StatusBox({
  text,
  className = "bg-gray-50 text-gray-500",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`mb-4 rounded-lg p-3 text-xs ${className}`}>
      {text}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  color = "blue",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "blue" | "green";
}) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition ${colors[color]}`}
    >
      {children}
    </button>
  );
}

function DisabledButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      disabled
      className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-white"
    >
      {children}
    </button>
  );
}
