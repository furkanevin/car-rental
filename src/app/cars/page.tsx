export const dynamic = "force-dynamic";

import { Metadata } from "next";
import CatalogClient from "./_components/catalog-client";

export const metadata: Metadata = {
  title: "Browse All Cars - MORENT Car Rental Catalog",
  description:
    "Explore our complete catalog of rental cars. Filter by type, capacity, price, and more. Find the perfect vehicle for your journey with MORENT.",
  keywords: [
    "car catalog",
    "browse cars",
    "rental cars",
    "SUV rental",
    "sedan rental",
    "sports car",
    "MORENT catalog",
  ],
  openGraph: {
    title: "Browse All Cars - MORENT",
    description: "Explore our complete catalog of rental cars",
    type: "website",
  },
};

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-[1440px]">
        <CatalogClient />
      </div>
    </div>
  );
}
