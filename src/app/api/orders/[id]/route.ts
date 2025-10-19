import connectDB from "@/lib/mongodb";
import { Order } from "@/models/order";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Sipariş bilgilerini veritabanından al ve araç bilgilerini de populate et
    const order = await Order.findById(id)
      .populate("product", "make modelName images pricePerDay")
      .populate("user", "firstName lastName email");

    if (!order) {
      return NextResponse.json(
        { message: "Sipariş bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Bir hata oluştu", error },
      { status: 500 }
    );
  }
}
