"use client";

import { FormEvent, useState } from "react";
import { MapPin } from "lucide-react";
import { Car } from "@/types/car";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CarBookingCardProps {
  car: Car;
}

export function CarBookingCard({ car }: CarBookingCardProps) {
  const { data: session } = useSession();
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");
  const [pickupLocation, setPickupLocation] = useState(car.location);
  const [dropoffLocation, setDropoffLocation] = useState(car.location);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ödeme İşlemi İçin API'a Araç ve Tarih Bilgilerini Gönder
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          carId: car._id,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          pickupLocation,
          dropoffLocation,
          additionalNotes,
        }),
      });

      const data = await res.json();

      // kullanıcınıyı ödeme sayfasına yönlendir
      window.location.href = data.url;
    } catch (error) {
      toast.error("Ödeme anında bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-gray-900">
            ${car.pricePerDay.toFixed(2)}
          </span>
          <span className="text-gray-500">/ days</span>
        </div>
      </div>

      {/* Pickup Date & Time */}
      <div className="mb-6">
        <h3 className="text-gray-900 font-semibold mb-4">Pickup Date & Time</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="pickup-date"
              className="block text-sm font-bold text-gray-900 mb-2"
            >
              Date
            </label>
            <input
              id="pickup-date"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="order-input"
              placeholder="Select your date"
              required
            />
          </div>
          <div>
            <label
              htmlFor="pickup-time"
              className="block text-sm font-bold text-gray-900 mb-2"
            >
              Time
            </label>
            <select
              id="pickup-time"
              value={pickupTime}
              required
              onChange={(e) => setPickupTime(e.target.value)}
              className="order-input"
            >
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
            </select>
          </div>
        </div>
      </div>

      {/* Return Date & Time */}
      <div className="mb-6">
        <h3 className="text-gray-900 font-semibold mb-4">Return Date & Time</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="return-date"
              className="block text-sm font-bold text-gray-900 mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              required
              onChange={(e) => setReturnDate(e.target.value)}
              className="order-input"
              placeholder="Select your date"
            />
          </div>
          <div>
            <label
              htmlFor="return-time"
              className="block text-sm font-bold text-gray-900 mb-2"
            >
              Time
            </label>
            <select
              id="return-time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="order-input"
            >
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div className="mb-6">
        <h3 className="text-gray-900 font-semibold mb-4">Pickup Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            disabled
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="order-input pl-10 py-3"
            placeholder="Enter location"
          />
        </div>
      </div>

      {/* Drop-off Location */}
      <div className="mb-6">
        <h3 className="text-gray-900 font-semibold mb-4">Drop-off Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            disabled
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="order-input pl-10 py-3"
            placeholder="Enter location"
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="mb-6">
        <label
          htmlFor="additional-notes"
          className="text-gray-900 font-semibold mb-4 block"
        >
          Additional Notes (Optional)
        </label>
        <textarea
          id="additional-notes"
          className="order-input py-3 resize-none"
          rows={4}
          placeholder="Any special requests or notes"
          onChange={(e) => setAdditionalNotes(e.target.value)}
          value={additionalNotes}
        />
      </div>

      {/* Book Button */}
      {!session?.user ? (
        <Link href="/auth/login">
          <button className="submit-button">Login to Book</button>
        </Link>
      ) : (
        <button
          disabled={isLoading || !session?.user}
          className="submit-button"
        >
          {isLoading ? "Loading..." : "Rent Now"}
        </button>
      )}
    </form>
  );
}
