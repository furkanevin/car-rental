import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchCarById } from "@/lib/cars";
import { CarImagesViewer } from "@/components/car-images-viewer";
import { CarInfoSection } from "@/components/car-info-section";
import { CarBookingCard } from "@/components/car-booking-card";
import { CarReviews } from "@/components/car-reviews";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await fetchCarById(id);

  if (!car) {
    return {
      title: "Car Not Found - MORENT",
    };
  }

  return {
    title: `Rent ${car.make} ${car.modelName} - $${car.pricePerDay}/day | MORENT`,
    description: `Rent ${car.make} ${car.modelName} ${car.year}. ${car.carType} with ${car.seats} seats, ${car.transmission} transmission, ${car.fuelType} fuel. Book now from $${car.pricePerDay} per day.`,
    keywords: [
      `${car.make} rental`,
      `${car.modelName} hire`,
      `rent ${car.carType}`,
      car.transmission,
      car.fuelType,
      "MORENT",
    ],
    openGraph: {
      title: `Rent ${car.make} ${car.modelName} - MORENT`,
      description: `${car.carType} with ${car.seats} seats from $${car.pricePerDay}/day`,
      type: "website",
    },
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;
  const car = await fetchCarById(id);

  if (!car) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Info (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Images */}
            <CarImagesViewer make={car.make} modelName={car.modelName} />

            {/* Car Info */}
            <CarInfoSection car={car} />

            {/* Reviews - Show on mobile/tablet, hidden on desktop */}
            <div className="lg:hidden">
              <CarReviews totalReviews={car.totalReviews ?? 13} />
            </div>
          </div>

          {/* Right Column - Booking Card (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <CarBookingCard car={car} />
            </div>
          </div>
        </div>

        {/* Reviews Section - Desktop Only (full width below) */}
        <div className="hidden lg:block mt-6">
          <CarReviews totalReviews={car.totalReviews ?? 13} />
        </div>
      </div>
    </div>
  );
}
