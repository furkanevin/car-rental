import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/car";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid car ID format",
        },
        { status: 400 }
      );
    }

    // Find car by ID
    const car = await Car.findById(id).lean();

    if (!car) {
      return NextResponse.json(
        {
          success: false,
          error: "Car not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      car,
    });
  } catch (error) {
    console.error("Error fetching car details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch car details",
      },
      { status: 500 }
    );
  }
}
