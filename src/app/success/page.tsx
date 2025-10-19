import { CheckCircle, Calendar, MapPin, Clock, Car } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getCarImageUrl } from "@/utils/car-helpers";
import { fetchOrderById } from "@/lib/orders";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Successful - MORENT Car Rental",
  description:
    "Your car rental booking has been confirmed successfully. View your reservation details and pickup information.",
  robots: {
    index: false,
    follow: true,
  },
};

interface PageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
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
        {/* Success Header */}
        <div className="bg-white rounded-xl p-8 mb-6 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rezervasyon Başarılı!
          </h1>
          <p className="text-gray-600 mb-4">
            Kiralama işleminiz başarıyla tamamlandı. Rezervasyon detaylarınız
            aşağıda yer almaktadır.
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
            <div className="flex-shrink-0 w-full sm:w-64 h-40 bg-gradient-to-br from-[#3563E9] to-[#54A6FF] rounded-lg p-4 flex items-center justify-center">
              <img
                src={carImageUrl}
                alt={`${order.product.make} ${order.product.modelName}`}
                className="w-full h-full object-contain"
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
                  <span className="font-bold text-[#3563E9] text-2xl">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Kiralama Detayları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#3563E9] rounded-full p-2 mt-1">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Teslim Alma
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formatDate(pickupDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#3563E9] rounded-full p-2 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">Saat</h3>
                  <p className="text-gray-600 text-sm">
                    {order.rental.pickupTime}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#3563E9] rounded-full p-2 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">Konum</h3>
                  <p className="text-gray-600 text-sm">
                    {order.rental.pickupLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Return Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#54A6FF] rounded-full p-2 mt-1">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Teslim Etme
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formatDate(returnDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#54A6FF] rounded-full p-2 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">Saat</h3>
                  <p className="text-gray-600 text-sm">
                    {order.rental.returnTime}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#54A6FF] rounded-full p-2 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">Konum</h3>
                  <p className="text-gray-600 text-sm">
                    {order.rental.dropoffLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {order.rental.additionalNotes && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Ek Notlarınız
              </h3>
              <p className="text-gray-600 text-sm">
                {order.rental.additionalNotes}
              </p>
            </div>
          )}
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            📋 Önemli Bilgiler
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#3563E9] mt-1">•</span>
              <span>
                Belirlenen tarih ve saatte{" "}
                <strong>{order.rental.pickupLocation}</strong> konumundan
                aracınızı teslim alabilirsiniz.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3563E9] mt-1">•</span>
              <span>
                Araç tesliminde geçerli bir sürücü belgesi ve kimlik belgesi
                getirmeyi unutmayın.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3563E9] mt-1">•</span>
              <span>
                Rezervasyon detaylarınız e-posta adresinize gönderilmiştir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3563E9] mt-1">•</span>
              <span>
                Herhangi bir sorunuz için müşteri hizmetlerimizle iletişime
                geçebilirsiniz.
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/orders"
            className="flex-1 bg-[#3563E9] hover:bg-[#2952CC] text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Siparişlerime Git
          </Link>
          <Link
            href="/cars"
            className="flex-1 bg-white hover:bg-gray-50 text-[#3563E9] border-2 border-[#3563E9] font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Diğer Araçları İncele
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
