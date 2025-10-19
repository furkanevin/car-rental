"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // Compute page numbers (simple window)
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className="px-3 py-2 rounded-lg text-sm border border-gray-200 disabled:opacity-50 bg-white"
      >
        Prev
      </button>
      {start > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className={`px-3 py-2 rounded-lg text-sm border border-gray-200 bg-white ${
              page === 1 ? "bg-[#3563E9]! text-white border-transparent" : ""
            }`}
          >
            1
          </button>
          {start > 2 && <span className="text-gray-400">…</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-2 rounded-lg text-sm border border-gray-200 bg-white ${
            page === p ? "bg-[#3563E9]! text-white border-transparent" : ""
          }`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-gray-400">…</span>}
          <button
            onClick={() => onChange(totalPages)}
            className={`px-3 py-2 rounded-lg text-sm border border-gray-200 bg-white ${
              page === totalPages
                ? "bg-[#3563E9]! text-white border-transparent"
                : ""
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className="px-3 py-2 rounded-lg text-sm border border-gray-200 disabled:opacity-50 bg-white"
      >
        Next
      </button>
    </div>
  );
}
