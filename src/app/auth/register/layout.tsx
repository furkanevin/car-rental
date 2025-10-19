import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - MORENT Car Rental",
  description:
    "Create your MORENT account and start renting cars today. Sign up for exclusive deals and easy car rental management.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
