export default function Pagination({ page, pages, onChange }: any) {
  return (
    <div className="flex justify-center items-center gap-2 mt-5">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="font-semibold">{page} / {pages}</span>

      <button
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
