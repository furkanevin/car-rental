import mongoose, { Schema, model, models } from "mongoose";

export interface ICar {
  make: string;
  modelName: string;
  year: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  seats: number;
  doors: number;
  pricePerDay: number;
  images: string[];
  description: string;
  features: string[];
  location: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  mileage: number;
  color: string;
  licensePlate: string;
  carType:
    | "Sedan"
    | "SUV"
    | "Sports"
    | "Hatchback"
    | "Coupe"
    | "Convertible"
    | "Van"
    | "Truck";
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema<ICar>(
  {
    make: {
      type: String,
      required: [true, "Car make is required"],
      trim: true,
    },
    modelName: {
      type: String,
      required: [true, "Model name is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be 1900 or later"],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future"],
    },
    transmission: {
      type: String,
      required: [true, "Transmission type is required"],
      enum: ["Automatic", "Manual"],
    },
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },
    seats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: [2, "Must have at least 2 seats"],
      max: [8, "Cannot have more than 8 seats"],
    },
    doors: {
      type: Number,
      required: [true, "Number of doors is required"],
      min: [2, "Must have at least 2 doors"],
      max: [5, "Cannot have more than 5 doors"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: [0, "Price cannot be negative"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: "At least one image is required",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    features: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, "Total reviews cannot be negative"],
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required"],
      min: [0, "Mileage cannot be negative"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    licensePlate: {
      type: String,
      required: [true, "License plate is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    carType: {
      type: String,
      required: [true, "Car type is required"],
      enum: [
        "Sedan",
        "SUV",
        "Sports",
        "Hatchback",
        "Coupe",
        "Convertible",
        "Van",
        "Truck",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
CarSchema.index({ make: 1, modelName: 1 });
CarSchema.index({ location: 1 });
CarSchema.index({ pricePerDay: 1 });
CarSchema.index({ carType: 1 });
CarSchema.index({ isAvailable: 1 });

const Car = models.Car || model<ICar>("Car", CarSchema);

export default Car;
