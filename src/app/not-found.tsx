import Link from "next/link";
import { Home, Car } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F9] px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-[#3563E9] opacity-10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="w-20 h-20 sm:w-24 sm:h-24 text-[#3563E9]" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have taken a different
          route. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#3563E9] text-white font-semibold rounded-lg hover:bg-[#2952CC] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#3563E9] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 border-2 border-[#3563E9]"
          >
            <Car className="w-5 h-5" />
            Browse Cars
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#3563E9] animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-[#54A6FF] animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-[#3563E9] animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
