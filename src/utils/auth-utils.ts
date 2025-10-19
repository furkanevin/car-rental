import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user ?? null;
};
