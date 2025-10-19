import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/car";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const carType = searchParams.get("carType");
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const seats = searchParams.get("seats");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build filter object
    const filter: any = {};

    // Text search for make (case-insensitive, partial match)
    if (make) {
      filter.make = { $regex: make, $options: "i" };
    }

    // Text search for model (case-insensitive, partial match)
    if (model) {
      filter.modelName = { $regex: model, $options: "i" };
    }

    // Exact match filters
    if (carType) {
      filter.carType = carType;
    }

    if (location) {
      filter.location = location;
    }

    if (transmission) {
      filter.transmission = transmission;
    }

    if (fuelType) {
      filter.fuelType = fuelType;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) {
        filter.pricePerDay.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter.pricePerDay.$lte = parseFloat(maxPrice);
      }
    }

    // Seats filter (minimum seats)
    if (seats) {
      filter.seats = { $gte: parseInt(seats) };
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [carsData, total] = await Promise.all([
      Car.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Car.countDocuments(filter),
    ]);

    // Serialize MongoDB documents
    const cars = carsData.map((car: any) => ({
      ...car,
      _id: car._id.toString(),
    }));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      cars,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch cars",
      },
      { status: 500 }
    );
  }
}
