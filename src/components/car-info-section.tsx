import { Car } from "@/types/car";
import { getFuelCapacity } from "@/utils/car-helpers";
import {
  Fuel,
  Settings,
  Users,
  Gauge,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface CarInfoSectionProps {
  car: Car;
}

export function CarInfoSection({ car }: CarInfoSectionProps) {
  const fuelCapacity = getFuelCapacity(car.fuelType);
  const rating = car.averageRating ?? 4;
  const totalStars = 5;

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {car.make} {car.modelName}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {car.carType} • {car.year || 2023}
          </span>
        </div>
        {car.location && (
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{car.location}</span>
          </div>
        )}
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Fuel className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Fuel Type</span>
          </div>
          <span className="font-semibold text-gray-900">{car.fuelType}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Transmission</span>
          </div>
          <span className="font-semibold text-gray-900">
            {car.transmission}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Seats</span>
          </div>
          <span className="font-semibold text-gray-900">
            {car.seats} People
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Mileage</span>
          </div>
          <span className="font-semibold text-gray-900">
            {car.mileage?.toLocaleString() || "12,000"} miles
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          {car.description ||
            "Premium luxury SUV with exceptional comfort and performance features."}
        </p>
      </div>

      {/* Features */}
      {car.features && car.features.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
