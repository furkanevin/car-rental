import { Car } from "@/types/car";

/**
 * Fetch cars from the API
 * @returns Object containing popularCars and recommendedCars arrays
 */
export async function fetchCars(): Promise<{
  popularCars: Car[];
  recommendedCars: Car[];
}> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Fetch popular cars (Sports and high-rated)
    const popularRes = await fetch(
      `${baseUrl}/api/cars?carType=Sports&limit=4`,
      { cache: "no-store" }
    );
    const popularData = await popularRes.json();

    // Fetch recommended cars (various types)
    const recommendedRes = await fetch(
      `${baseUrl}/api/cars?limit=8&sortBy=averageRating&sortOrder=desc`,
      { cache: "no-store" }
    );
    const recommendedData = await recommendedRes.json();

    return {
      popularCars: popularData.cars || [],
      recommendedCars: recommendedData.cars || [],
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      popularCars: [],
      recommendedCars: [],
    };
  }
}

/**
 * Fetch single car by id from the API
 */
export async function fetchCarById(id: string): Promise<Car | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cars/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.car as Car) || null;
  } catch (error) {
    console.error("Error fetching car by id:", error);
    return null;
  }
}
