export interface OrderData {
  _id: string;
  product: {
    _id: string;
    make: string;
    modelName: string;
    images: string[];
    pricePerDay: number;
    carType: string;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totalAmount: number;
  currency: string;
  status: string;
  rental: {
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    days: number;
    additionalNotes?: string;
  };
  createdAt: string;
}
