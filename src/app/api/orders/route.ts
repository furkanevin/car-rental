import connectDB from "@/lib/mongodb";
import { Order } from "@/models/order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Session'dan kullanıcı bilgisini al (API route için özel)
    const session = await getServerSession(authOptions);

    // Kullanıcının oturumu kapalıysa hata dön
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Kullanıcı oturumu kapalı" },
        { status: 401 }
      );
    }

    // Session'dan user ID'yi al
    const userId = session.user.id;

    // Kullanıcının tüm siparişlerini al ve araç bilgilerini populate et
    const orders = await Order.find({ user: userId })
      .populate("product", "make modelName images pricePerDay carType")
      .sort({ createdAt: -1 })
      .lean();

    // MongoDB dökümanlarını serialize et
    const serializedOrders = orders.map((order: any) => ({
      _id: order._id.toString(),
      createdAt: order.createdAt.toString(),
      status: order.status,
      totalAmount: order.totalAmount,
      currency: order.currency,
      rental: {
        pickupDate: order.rental.pickupDate.toString(),
        returnDate: order.rental.returnDate.toString(),
        pickupTime: order.rental.pickupTime,
        returnTime: order.rental.returnTime,
        pickupLocation: order.rental.pickupLocation,
        dropoffLocation: order.rental.dropoffLocation,
        days: order.rental.days,
        additionalNotes: order.rental.additionalNotes,
      },
      product: {
        _id: order.product._id.toString(),
        make: order.product.make,
        modelName: order.product.modelName,
        images: order.product.images,
        pricePerDay: order.product.pricePerDay,
        carType: order.product.carType,
      },
    }));

    return NextResponse.json({ orders: serializedOrders }, { status: 200 });
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu", error },
      { status: 500 }
    );
  }
}
