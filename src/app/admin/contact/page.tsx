"use client";

import { useEffect, useState } from "react";
import { getContact } from "@/lib/api/admin/contact";
import { Contact } from "@/lib/types/contact";

export default function AdminContactPage() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getContact()
      .then((res) => {
        setData(res.data ?? res);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Contact Inquiries</h1>

      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="px-6 py-4 text-left font-semibold text-gray-600">
            Nama
          </th>
          <th className="px-6 py-4 text-left font-semibold text-gray-600">
            Email
          </th>
          <th className="px-6 py-4 text-left font-semibold text-gray-600">
            Pesan
          </th>
          <th className="px-6 py-4 text-left font-semibold text-gray-600">
            Tanggal
          </th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {data.map((c) => (
          <tr
            key={c.id}
            className="hover:bg-gray-50 transition"
          >
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {c.name}
            </td>

            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              <a
                href={`mailto:${c.email}`}
                className="text-blue-600 hover:underline"
              >
                {c.email}
              </a>
            </td>

            <td className="px-6 py-4 text-gray-700 max-w-md">
              <p className="line-clamp-2">
                {c.message}
              </p>
            </td>

            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
              {new Date(c.created_at).toLocaleDateString("id-ID")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}
