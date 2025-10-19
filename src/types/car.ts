export interface Car {
  _id: string;
  make: string;
  modelName: string;
  carType: string;
  fuelType: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  images: string[];
  // Optional details for the car detail page
  description?: string;
  averageRating?: number;
  totalReviews?: number;
  location?: string;
  features?: string[];
  mileage?: number;
  year?: number;
}

export interface CheckoutBody {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  additionalNotes?: string;
}
