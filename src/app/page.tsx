import Link from "next/link";
import { Metadata } from "next";
import { Car } from "@/types/car";
import { CarCard } from "@/components/car-card";
import { fetchCars } from "@/lib/cars";
import { getCarImageUrl } from "@/utils/car-helpers";

export const metadata: Metadata = {
  title: "MORENT - Premium Car Rental Service | Rent Cars at Best Prices",
  description:
    "Find and rent your perfect car with MORENT. Discover our wide selection of luxury, sports, and family cars at competitive prices. Easy booking, flexible rental periods, and excellent service.",
  keywords: [
    "car rental",
    "rent a car",
    "car hire",
    "luxury car rental",
    "sports car rental",
    "affordable car rental",
    "MORENT",
  ],
  openGraph: {
    title: "MORENT - Premium Car Rental Service",
    description:
      "The best platform for car rental. Ease of doing a car rental safely and reliably at a low price.",
    type: "website",
  },
};

export default async function Home() {
  const { popularCars, recommendedCars } = await fetchCars();

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hero Card 1 */}
          <div className="relative bg-gradient-to-br from-[#54A6FF] to-[#3563E9] rounded-xl p-6 sm:p-8 md:p-10 text-white overflow-hidden min-h-[280px] sm:min-h-[320px]">
            <div className="relative z-10 max-w-[280px]">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                The Best Platform for Car Rental
              </h1>
              <p className="text-sm sm:text-base mb-6 text-white/90">
                Ease of doing a car rental safely and reliably. Of course at a
                low price.
              </p>
              <button className="bg-[#3563E9] hover:bg-[#2952CC] transition-colors px-6 py-3 rounded-lg text-white font-semibold text-sm">
                Rental Car
              </button>
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] sm:w-[50%] h-auto">
              <img
                src={getCarImageUrl("Porsche", "991", "05")}
                alt="Sports Car"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Hero Card 2 */}
          <div className="relative bg-gradient-to-br from-[#5CAFFC] to-[#3563E9] rounded-xl p-6 sm:p-8 md:p-10 text-white overflow-hidden min-h-[280px] sm:min-h-[320px]">
            <div className="relative z-10 max-w-[280px]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                Easy way to rent a car at a low price
              </h2>
              <p className="text-sm sm:text-base mb-6 text-white/90">
                Providing cheap car rental services and safe and comfortable
                facilities.
              </p>
              <button className="bg-[#3563E9] hover:bg-[#2952CC] transition-colors px-6 py-3 rounded-lg text-white font-semibold text-sm">
                Rental Car
              </button>
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] sm:w-[50%] h-auto">
              <img
                src={getCarImageUrl("Nissan", "GT-R", "05")}
                alt="Luxury Car"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Pick-Up & Drop-Off Section */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Pick-Up */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#3563E9]/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#3563E9]"></div>
                </div>
                <span className="font-semibold text-gray-900">Pick - Up</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="locations"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Locations
                  </label>
                  <select
                    id="locations"
                    disabled
                    className="w-full text-sm text-gray-400 bg-white border-0 focus:outline-none cursor-not-allowed"
                  >
                    <option>Select your city</option>
                  </select>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Date
                  </label>
                  <select
                    id="date"
                    disabled
                    className="w-full text-sm text-gray-400 bg-white border-0 focus:outline-none cursor-not-allowed"
                  >
                    <option>Select your date</option>
                  </select>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                  <label
                    htmlFor="time"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Time
                  </label>
                  <select
                    id="time"
                    disabled
                    className="w-full text-sm text-gray-400 bg-white border-0 focus:outline-none cursor-not-allowed"
                  >
                    <option>Select your time</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex-shrink-0">
              <button
                aria-label="Swap pick-up and drop-off locations"
                className="w-14 h-14 bg-[#3563E9] rounded-lg flex items-center justify-center text-white hover:bg-[#2952CC] transition-colors shadow-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* Drop-Off */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#54A6FF]/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#54A6FF]"></div>
                </div>
                <span className="font-semibold text-gray-900">Drop - Off</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="dropoff-locations"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Locations
                  </label>
                  <select
                    id="dropoff-locations"
                    disabled
                    className="w-full text-sm text-gray-400 bg-white border-0 focus:outline-none cursor-not-allowed"
                  >
                    <option>Select your city</option>
                  </select>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                  <label
                    htmlFor="dropoff-date"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Date
                  </label>
                  <select
                    id="dropoff-date"
                    disabled
                    className="w-full text-sm text-gray-400 bg-white border-0 focus:outline-none cursor-not-allowed"
                  >
                    <option>Select your date</option>
                  </select>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                  <label
                    htmlFor="dropoff-time"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Time
                  </label>
                  <select
                    id="dropoff-time"
                    disabled
                    className="w-full text-sm text-gray-400 bg-white border-0 focus:outline-none cursor-not-allowed"
                  >
                    <option>Select your time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Car Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-500 text-sm sm:text-base">Popular Car</h2>
            <Link
              href="/cars"
              className="text-[#3563E9] font-semibold text-sm sm:text-base hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCars.map((car: Car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </div>

        {/* Recommendation Car Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-500 text-sm sm:text-base">
              Recommendation Car
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCars.map((car: Car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Link
              href="/cars"
              className="bg-[#3563E9] hover:bg-[#2952CC] transition-colors px-8 py-3 rounded-lg text-white font-semibold text-sm"
            >
              Show more car
            </Link>
            <span className="text-gray-800 text-sm">120 Car</span>
          </div>
        </div>
      </div>
    </div>
  );
}
