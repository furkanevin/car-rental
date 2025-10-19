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
    const orderData: any = await Order.findById(id)
      .populate("product", "make modelName images pricePerDay carType")
      .populate("user", "firstName lastName email")
      .lean();

    if (!orderData) {
      return NextResponse.json(
        { message: "Sipariş bulunamadı" },
        { status: 404 }
      );
    }

    // MongoDB dökümanlarını serialize et
    const serializedOrder = {
      _id: orderData._id.toString(),
      createdAt: orderData.createdAt.toString(),
      status: orderData.status,
      totalAmount: orderData.totalAmount,
      currency: orderData.currency,
      user: {
        firstName: orderData.user?.firstName || "",
        lastName: orderData.user?.lastName || "",
        email: orderData.user?.email || "",
      },
      rental: {
        pickupDate: orderData.rental.pickupDate.toString(),
        returnDate: orderData.rental.returnDate.toString(),
        pickupTime: orderData.rental.pickupTime,
        returnTime: orderData.rental.returnTime,
        pickupLocation: orderData.rental.pickupLocation,
        dropoffLocation: orderData.rental.dropoffLocation,
        days: orderData.rental.days,
        additionalNotes: orderData.rental.additionalNotes,
      },
      product: {
        _id: orderData.product._id.toString(),
        make: orderData.product.make,
        modelName: orderData.product.modelName,
        images: orderData.product.images,
        pricePerDay: orderData.product.pricePerDay,
        carType: orderData.product.carType,
      },
    };

    return NextResponse.json({ order: serializedOrder }, { status: 200 });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu", error },
      { status: 500 }
    );
  }
}
