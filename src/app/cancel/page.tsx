import {
  XCircle,
  AlertCircle,
  Car,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getCarImageUrl } from "@/utils/car-helpers";
import { fetchOrderById } from "@/lib/orders";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Cancelled - MORENT Car Rental",
  description:
    "Your car rental booking was cancelled. You can try again or browse other available vehicles.",
  robots: {
    index: false,
    follow: true,
  },
};

interface PageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CancelPage({ searchParams }: PageProps) {
  const { orderId } = await searchParams;

  // orderId yoksa ana sayfaya yönlendir
  if (!orderId) {
    redirect("/");
  }

  // Sipariş detaylarını al
  const order = await fetchOrderById(orderId);

  // Sipariş bulunamazsa 404 göster
  if (!order) {
    return notFound();
  }

  const pickupDate = new Date(order.rental.pickupDate);
  const returnDate = new Date(order.rental.returnDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const carImageUrl = getCarImageUrl(
    order.product.make,
    order.product.modelName,
    "01"
  );

  return (
    <div className="min-h-screen bg-[#F6F7F9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Cancel Header */}
        <div className="bg-white rounded-xl p-8 mb-6 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-4">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ödeme İptal Edildi
          </h1>
          <p className="text-gray-600 mb-4">
            Kiralama işleminiz tamamlanmadı. Ödeme işlemi iptal edildi veya bir
            hata oluştu.
          </p>
          <p className="text-sm text-gray-500">
            Sipariş No: <span className="font-semibold">{order._id}</span>
          </p>
        </div>

        {/* Car Details */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Car className="w-6 h-6 text-[#3563E9]" />
            Araç Bilgileri
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 w-full sm:w-64 h-40 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg p-4 flex items-center justify-center">
              <img
                src={carImageUrl}
                alt={`${order.product.make} ${order.product.modelName}`}
                className="w-full h-full object-contain opacity-60"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {order.product.make} {order.product.modelName}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Günlük Fiyat</span>
                  <span className="font-semibold text-gray-900">
                    ${order.product.pricePerDay.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Kiralama Süresi</span>
                  <span className="font-semibold text-gray-900">
                    {order.rental.days} Gün
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 text-lg">Toplam Tutar</span>
                  <span className="font-bold text-gray-700 text-2xl">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Summary */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Rezervasyon Özeti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="bg-[#3563E9] rounded-full p-1">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                Teslim Alma
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(pickupDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{order.rental.pickupTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{order.rental.pickupLocation}</span>
                </div>
              </div>
            </div>

            {/* Return Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="bg-[#54A6FF] rounded-full p-1">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                Teslim Etme
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(returnDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{order.rental.returnTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{order.rental.dropoffLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            Dikkat
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>
                Ödeme işleminiz tamamlanmadığı için rezervasyonunuz
                oluşturulmadı.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>
                Bu araç için rezervasyon yapmak istiyorsanız tekrar
                deneyebilirsiniz.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>
                Araç müsaitlik durumu değişebilir, en kısa sürede rezervasyon
                yapmanızı öneririz.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>
                Ödeme ile ilgili sorun yaşıyorsanız müşteri hizmetlerimizle
                iletişime geçebilirsiniz.
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={`/cars/${order.product._id}`}
            className="bg-[#3563E9] hover:bg-[#2952CC] text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Tekrar Dene
          </Link>
          <Link
            href="/orders"
            className="bg-white hover:bg-gray-50 text-[#3563E9] border-2 border-[#3563E9] font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Siparişlerime Git
          </Link>
          <Link
            href="/cars"
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Diğer Araçları İncele
          </Link>
          <Link
            href="/"
            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
