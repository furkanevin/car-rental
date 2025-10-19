"use client";

type FiltersSidebarProps = {
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
};

const carTypes = [
  "all",
  "Sedan",
  "SUV",
  "Sports",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Van",
  "Truck",
];

const transmissions = ["all", "Automatic", "Manual"];
const fuelTypes = ["all", "Petrol", "Diesel", "Electric", "Hybrid"];

export default function FiltersSidebar({
  values,
  onChange,
  onClear,
}: FiltersSidebarProps) {
  const hasActiveFilters = Boolean(
    (values.carType && values.carType !== "all") ||
      values.location ||
      values.minPrice ||
      values.maxPrice ||
      (values.transmission && values.transmission !== "all") ||
      (values.fuelType && values.fuelType !== "all") ||
      values.seats
  );
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Filters</h3>

      {/* Car Type */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Car Type
        </label>
        <select
          className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2"
          value={values.carType || "all"}
          onChange={(e) => onChange("carType", e.target.value)}
        >
          {carTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Location
        </label>
        <input
          className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2"
          placeholder="Any Location"
          value={values.location || ""}
          onChange={(e) => onChange("location", e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Price Range (per day)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min={0}
            placeholder="Min"
            className="text-sm bg-white border border-gray-200 rounded-lg p-2"
            value={values.minPrice || ""}
            onChange={(e) => onChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            min={0}
            placeholder="Max"
            className="text-sm bg-white border border-gray-200 rounded-lg p-2"
            value={values.maxPrice || ""}
            onChange={(e) => onChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Transmission
        </label>
        <select
          className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2"
          value={values.transmission || "all"}
          onChange={(e) => onChange("transmission", e.target.value)}
        >
          {transmissions.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Transmissions" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Fuel Type */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Fuel Type
        </label>
        <select
          className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2"
          value={values.fuelType || "all"}
          onChange={(e) => onChange("fuelType", e.target.value)}
        >
          {fuelTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Fuel Types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Seats */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Number of Seats
        </label>
        <select
          className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2"
          value={values.seats || ""}
          onChange={(e) => onChange("seats", e.target.value)}
        >
          <option value="">Any Number</option>
          {[2, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="w-full px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
