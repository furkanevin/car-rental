import { OrderData } from "@/types/order";

export async function fetchOrderById(
  orderId: string
): Promise<OrderData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/orders/${orderId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export async function fetchUserOrders(): Promise<OrderData[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
