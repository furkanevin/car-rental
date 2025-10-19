"use client";

import Link from "next/link";
import {
  Bell,
  Heart,
  LogOut,
  Search,
  Settings,
  UserIcon,
  ShoppingBag,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const HeaderAuthSection = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Mobile Search Icon */}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50 md:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-gray-600" />
      </button>

      {/* Conditional rendering based on auth status */}
      {status === "loading" ? (
        <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"></div>
      ) : session ? (
        <>
          {/* Heart Icon */}
          <button
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Favorites"
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>

          {/* Bell Icon with Notification Badge */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          {/* Settings Icon */}
          <button
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </button>

          {/* Profile Picture with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200 transition-all hover:border-[#3563E9]"
              aria-label="Profile"
            >
              <img
                src={
                  session.user?.image ||
                  `https://ui-avatars.com/api/?background=3563E9&color=fff&name=${session.user?.firstName}+${session.user?.lastName}`
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 z-99 rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {session.user?.firstName} {session.user?.lastName}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </button>
                  <Link
                    href="/orders"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Siparişlerim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Login and Sign Up Links */}
          <Link
            href="/auth/login"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg bg-[#3563E9] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2952CC]"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderAuthSection;
