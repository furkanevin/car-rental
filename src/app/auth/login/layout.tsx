import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - MORENT Car Rental",
  description:
    "Sign in to your MORENT account to manage your car rentals, view bookings, and access exclusive deals.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
