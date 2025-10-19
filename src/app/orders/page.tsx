"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ShoppingBag,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getCarImageUrl } from "@/utils/car-helpers";
import { OrderData } from "@/types/order";

export default function OrdersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    // Fetch orders when authenticated
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/orders");

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/login");
          return;
        }
        throw new Error("Siparişler yüklenirken bir hata oluştu");
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking authentication or fetching data
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#3563E9] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Siparişler yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hata</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-[#3563E9] hover:bg-[#2952CC] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="w-4 h-4" />
            Ödendi
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
            <AlertCircle className="w-4 h-4" />
            Beklemede
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-4 h-4" />
            İptal Edildi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-[#3563E9]" />
            <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
          </div>
          <p className="text-gray-600">
            Tüm kiralama geçmişinizi ve aktif rezervasyonlarınızı görüntüleyin.
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz sipariş yok
            </h2>
            <p className="text-gray-600 mb-6">
              Henüz bir araç kiralaması yapmadınız. Hemen araç kataloğumuza göz
              atın!
            </p>
            <Link
              href="/cars"
              className="inline-block bg-[#3563E9] hover:bg-[#2952CC] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Araçları İncele
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const carImageUrl = getCarImageUrl(
                order.product.make,
                order.product.modelName,
                "05"
              );
              const pickupDate = new Date(order.rental.pickupDate);
              const returnDate = new Date(order.rental.returnDate);

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 sm:p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Sipariş No:{" "}
                          <span className="font-semibold text-gray-900">
                            {order._id}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    {/* Order Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Car Image & Info */}
                      <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0 w-full sm:w-40 h-32 bg-gradient-to-br from-[#3563E9] to-[#54A6FF] rounded-lg p-3 flex items-center justify-center">
                          <img
                            src={carImageUrl}
                            alt={`${order.product.make} ${order.product.modelName}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {order.product.make} {order.product.modelName}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            {order.product.carType}
                          </p>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">
                                ${order.product.pricePerDay.toFixed(2)}
                              </span>{" "}
                              / gün
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">
                                {order.rental.days} gün
                              </span>{" "}
                              kiralama
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Rental Details */}
                      <div className="lg:col-span-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Pickup */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                              Teslim Alma
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-[#3563E9] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-900">
                                  {formatDate(order.rental.pickupDate)}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-[#3563E9] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-900">
                                  {order.rental.pickupTime}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#3563E9] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-900">
                                  {order.rental.pickupLocation}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Return */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                              Teslim Etme
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-[#54A6FF] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-900">
                                  {formatDate(order.rental.returnDate)}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-[#54A6FF] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-900">
                                  {order.rental.returnTime}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#54A6FF] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-900">
                                  {order.rental.dropoffLocation}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="lg:col-span-2 flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <p className="text-sm text-gray-500 mb-1">
                            Toplam Tutar
                          </p>
                          <p className="text-2xl font-bold text-[#3563E9]">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {order.status === "paid" ? (
                            <Link
                              href={`/success?orderId=${order._id}`}
                              className="text-center bg-[#3563E9] hover:bg-[#2952CC] text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                              Detayları Gör
                            </Link>
                          ) : order.status === "cancelled" ? (
                            <Link
                              href={`/cancel?orderId=${order._id}`}
                              className="text-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                              Detayları Gör
                            </Link>
                          ) : (
                            <Link
                              href={`/cars/${order.product._id}`}
                              className="text-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                              Ödemeyi Tamamla
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
