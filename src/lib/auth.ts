import { Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import UserModel, { IUser } from "@/models/user";
import type { Types } from "mongoose";
import { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          const user: IUser | null = await UserModel.findOne({
            email: credentials.email,
          }).select("+password");

          if (!user || !user.password) {
            return null;
          }

          const plainPassword = credentials.password as string;
          const hashedPassword = user.password as unknown as string;
          const isPasswordValid = await bcrypt.compare(
            plainPassword,
            hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: (user._id as Types.ObjectId).toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            image:
              user.image ||
              `https://ui-avatars.com/api/?background=3563E9&color=fff&name=${user.firstName}+${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    // access tokenın içerisine kaydedilecek veriler
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.phone = (user as any).phone;
      }
      return token;
    },

    // useSession hook'u ile alınacak veriler
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).firstName = token.firstName as string;
        (session.user as any).lastName = token.lastName as string;
        (session.user as any).phone = token.phone as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
