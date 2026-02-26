import { News } from "@/lib/types";
import { normalizeArray } from "utils/helper";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  data: News[] | { data: News[] } | null | undefined;
  onEdit: (n: News) => void;
  onDelete: (n: News) => void;
}

export default function NewsTable({ data, onEdit, onDelete }: Props) {
  const rows = normalizeArray<News>(data);
  const { lang } = useLanguage();

  if (rows.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Belum ada berita.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Title
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Excerpt
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Published
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {rows.map((n) => (
            <tr
              key={n.id ?? n.slug ?? JSON.stringify(n)}
              className="hover:bg-gray-50 transition"
            >
              {/* TITLE */}
              <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                {n.title}
              </td>

              {/* EXCERPT MULTI LANGUAGE */}
              <td className="px-6 py-3 text-gray-700 max-w-xs">
                <p
                  className="line-clamp-2"
                  title={
                    typeof n.excerpt === "object"
                      ? n.excerpt?.[lang] ??
                        n.excerpt?.["en"] ??
                        "-"
                      : n.excerpt
                  }
                >
                  {typeof n.excerpt === "object"
                    ? n.excerpt?.[lang] ??
                      n.excerpt?.["en"] ??
                      "-"
                    : n.excerpt || "-"}
                </p>
              </td>

              {/* STATUS */}
              <td className="px-6 py-3 text-gray-700">
                {n.is_published ? (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Published
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    Draft
                  </span>
                )}
              </td>

              {/* DATE */}
              <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                {n.published_at
                  ? new Date(n.published_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </td>

              {/* ACTION */}
              <td className="px-6 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(n)}
                  className="px-3 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(n)}
                  className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
