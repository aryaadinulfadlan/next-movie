import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.username = existingUser.username;
      token.saldo = existingUser.saldo;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      if (session.user && token.username) {
        session.user.username = token.username;
      }
      if (session.user && token.saldo) {
        session.user.saldo = token.saldo;
      }
      return session;
    },
  },
  ...authConfig,
});
