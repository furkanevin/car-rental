/**
 * Generate Imagin.studio CDN URL for car images
 * @param make - Car manufacturer (e.g., "BMW", "Toyota")
 * @param model - Car model name (e.g., "X6", "Camry")
 * @param angle - Camera angle (default: "01")
 * @returns Complete CDN URL for the car image
 */
export function getCarImageUrl(
  make: string,
  model: string,
  angle: string = "01"
): string {
  const baseUrl = "https://cdn.imagin.studio/getImage";
  const customerKey = "hrjavascript-mastery";

  // Clean and format the make and model
  const formattedMake = make.toLowerCase().replace(/\s+/g, "-");
  const formattedModel = model.toLowerCase().replace(/\s+/g, "-");

  return `${baseUrl}?customer=${customerKey}&make=${formattedMake}&modelFamily=${formattedModel}&angle=${angle}&width=800&zoomType=fullscreen`;
}

/**
 * Get fuel capacity string based on fuel type
 * @param fuelType - Type of fuel (Petrol, Diesel, Electric, Hybrid)
 * @returns Fuel capacity string (e.g., "90L", "70L")
 */
export function getFuelCapacity(fuelType: string): string {
  const capacity =
    fuelType === "Electric" ? "90L" : fuelType === "Hybrid" ? "60L" : "70L";
  return capacity;
}
