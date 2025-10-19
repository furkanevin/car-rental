import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import HeaderAuthSection from "./header-auth-section";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-[#3563E9] sm:text-3xl">
            MORENT
          </h1>
        </Link>

        {/* Search Bar - Hidden on small screens, shown on md and up */}
        <div className="hidden flex-1 max-w-2xl md:flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search something here"
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3563E9] focus:outline-none focus:ring-1 focus:ring-[#3563E9]"
            />
          </div>
          <button
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Right Side Icons */}
        <HeaderAuthSection />
      </div>

      {/* Mobile Search Bar */}
      <div className="border-t border-gray-200 px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search something here"
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3563E9] focus:outline-none focus:ring-1 focus:ring-[#3563E9]"
            />
          </div>
          <button
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
