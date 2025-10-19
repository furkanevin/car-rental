"use client";

import { useState, useEffect } from "react";

type ToolbarProps = {
  total: number;
  values: Record<string, string>;
  onSearch: (make: string) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  onLimitChange: (limit: number) => void;
};

export default function Toolbar({
  total,
  values,
  onSearch,
  onSortChange,
  onLimitChange,
}: ToolbarProps) {
  const [search, setSearch] = useState(values.make || "");

  useEffect(() => {
    setSearch(values.make || "");
  }, [values.make]);

  const sortValue = `${values.sortBy || "createdAt"}:${
    values.sortOrder || "desc"
  }`;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-80">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(search.trim());
            }}
            placeholder="Search cars..."
            className="w-full bg-[#F6F7F9] rounded-lg pl-9 pr-3 py-2.5 text-sm placeholder:text-gray-400 outline-none"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
        <button
          onClick={() => onSearch(search.trim())}
          className="hidden sm:inline-flex bg-[#3563E9] hover:bg-[#2952CC] text-white rounded-lg px-4 py-2 text-sm font-semibold"
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-500">
          {total} results
        </span>
        <select
          className="bg-white border border-gray-200 rounded-lg p-2 text-sm"
          value={sortValue}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split(":");
            onSortChange(sortBy, sortOrder as "asc" | "desc");
          }}
        >
          <option value="createdAt:desc">Newest</option>
          <option value="pricePerDay:asc">Price: Low to High</option>
          <option value="pricePerDay:desc">Price: High to Low</option>
          <option value="averageRating:desc">Rating</option>
        </select>

        <select
          className="bg-white border border-gray-200 rounded-lg p-2 text-sm"
          value={values.limit || "12"}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[8, 12, 16, 24].map((n) => (
            <option key={n} value={n}>
              {n}/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
