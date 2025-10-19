import Link from "next/link";
import { Car } from "@/types/car";
import { getCarImageUrl, getFuelCapacity } from "@/utils/car-helpers";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const imageUrl = getCarImageUrl(car.make, car.modelName, "05");
  const fuelCapacity = getFuelCapacity(car.fuelType);

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
      {/* Car Name and Type */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          {car.make} {car.modelName}
        </h3>
        <p className="text-sm text-gray-500">{car.carType}</p>
      </div>

      {/* Car Image */}
      <div className="flex-grow flex items-center justify-center my-8 relative h-[140px]">
        <img
          src={imageUrl}
          alt={`${car.make} ${car.modelName}`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Car Specs */}
      <div className="flex items-center gap-4 mb-6 text-gray-500 text-sm">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span>{fuelCapacity}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span>{car.transmission === "Manual" ? "Manual" : "Auto"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{car.seats} People</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-gray-900">
            ${car.pricePerDay.toFixed(2)}/
            <span className="text-sm text-gray-500">day</span>
          </p>
        </div>
        <Link
          href={`/cars/${car._id}`}
          className="bg-[#3563E9] hover:bg-[#2952CC] transition-colors px-5 py-2.5 rounded-lg text-white font-semibold text-sm"
        >
          Rent Now
        </Link>
      </div>
    </div>
  );
}
