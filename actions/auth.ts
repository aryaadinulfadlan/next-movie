"use server";

import { LoginSchema, RegisterSchema } from "@/schema";
import * as zod from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserByUsername } from "@/data/user";
import { db } from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { password, username, email, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email Already Exists!" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  });
  return { success: "Account Created, Please Login!" };
};

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { username, password } = validatedFields.data;

  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return { error: "Account Does not Exist!" };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something Went Wrong!" };
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
