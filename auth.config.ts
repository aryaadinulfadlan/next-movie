import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByUsername } from "./data/user";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schema";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { username, password } = validatedFields.data;
          const user = await getUserByUsername(username);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
