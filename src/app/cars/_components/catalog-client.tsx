"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Car } from "@/types/car";
import { CarCard } from "@/components/car-card";

import FiltersSidebar from "./filters-sidebar";
import Toolbar from "./toolbar";
import Pagination from "./pagination";

type ApiResponse = {
  success: boolean;
  cars: Car[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

function buildQueryString(params: URLSearchParams) {
  // Remove empty values for a cleaner URL
  const cleaned = new URLSearchParams();
  params.forEach((value, key) => {
    if (value !== "" && value !== "all") cleaned.set(key, value);
  });
  return cleaned.toString();
}

export default function CatalogClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiQuery = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) params.set("page", "1");
    if (!params.get("limit")) params.set("limit", "12");
    if (!params.get("sortBy")) params.set("sortBy", "createdAt");
    if (!params.get("sortOrder")) params.set("sortOrder", "desc");
    return params;
  }, [searchParams]);

  const fetchCars = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const qs = buildQueryString(apiQuery);
      const res = await fetch(`/api/cars?${qs}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data: ApiResponse = await res.json();
      setCars(data.cars);
      setTotal(data.pagination.total);
      setPage(data.pagination.page);
      setLimit(data.pagination.limit);
      setTotalPages(data.pagination.totalPages);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [apiQuery]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => void, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      if (resetPage) params.set("page", "1");
      const qs = buildQueryString(params);
      router.replace(`${pathname}?${qs}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Sidebar Filters */}
      <aside className="lg:sticky lg:top-6 self-start">
        <FiltersSidebar
          values={Object.fromEntries(apiQuery.entries())}
          onChange={(key, value) =>
            updateParams((p) => {
              if (!value || value === "all") p.delete(key);
              else p.set(key, value);
            })
          }
          onClear={() =>
            updateParams((p) => {
              p.delete("carType");
              p.delete("location");
              p.delete("minPrice");
              p.delete("maxPrice");
              p.delete("transmission");
              p.delete("fuelType");
              p.delete("seats");
            })
          }
        />
      </aside>

      {/* Main content */}
      <section className="space-y-4">
        <Toolbar
          total={total}
          values={Object.fromEntries(apiQuery.entries())}
          onSearch={(make) =>
            updateParams((p) => {
              if (make) p.set("make", make);
              else p.delete("make");
            })
          }
          onSortChange={(sortBy, sortOrder) =>
            updateParams((p) => {
              p.set("sortBy", sortBy);
              p.set("sortOrder", sortOrder);
            }, false)
          }
          onLimitChange={(newLimit) =>
            updateParams((p) => {
              p.set("limit", String(newLimit));
            })
          }
        />

        {/* States */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 h-[300px] animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="bg-white rounded-xl p-6 text-red-600">{error}</div>
        )}

        {!isLoading && !error && cars.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-gray-600">
            No cars match your filters.
          </div>
        )}

        {!isLoading && !error && cars.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * limit + 1} -
                {Math.min(page * limit, total)} of {total}
              </p>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={(p) =>
                  updateParams((params) => params.set("page", String(p)), false)
                }
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
