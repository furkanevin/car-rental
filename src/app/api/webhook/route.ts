import { Order } from "@/models/order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Strip'ta gerçekleşen eylemleri stripe bu webhook enpointine istek atarak API'mıza haber vericek
export const POST = async (req: Request) => {
  // 1) isteğin body kısmıbda gelen ödeme ile alakalı verileri al
  const body = await req.json();

  // 2) stripe'ın gönderdiği event'e eriş
  const session = body.data.object as Stripe.Checkout.Session;

  // 3) sipariş id'sine eriş
  const orderId = session.metadata?.order_id;

  if ((body.type = "checkout.session.completed")) {
    // 4) ödeme başarılı olduysa sipiariş verisini güncelle
    await Order.findByIdAndUpdate(orderId, { status: "paid" });
  } else if (session.status === "expired") {
    // 5) ödeme başarısız olduysa
    await Order.findByIdAndUpdate(orderId, { status: "cancelled" });
  }

  // stripe'a haberi aldığımızı bildir
  return NextResponse.json({ status: "success" }, { status: 200 });
};
