"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { Transaction } from "@/types/root";

export const buyMovie = async (
  userId: string,
  transaction: Transaction,
  price: number
) => {
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "Something Went Wrong!" };
  }
  const hasPurchased = await getBoughtMovie(userId, transaction.movie_id);
  if (hasPurchased) {
    return { error: "Already Bought This Movie!" };
  }
  const updateSaldo = await db.user.update({
    where: { id: existingUser.id },
    data: { saldo: existingUser.saldo - price },
  });
  if (!updateSaldo) {
    return { error: "Purchase Failed!" };
  }
  await db.transaction.create({
    data: {
      userId,
      movie_id: transaction.movie_id,
      movie_title: transaction.movie_title,
      movie_overview: transaction.movie_overview,
      movie_poster_path: transaction.movie_poster_path,
      movie_release_date: transaction.movie_release_date,
      movie_rating: transaction.movie_rating,
      movie_review: transaction.movie_review,
      movie_price: price,
    },
  });
  return {
    success: "Successful Purchase, Please see in the Transactions Page",
  };
};

export const getBoughtMovie = async (userId: string, movieId: number) => {
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "Something Went Wrong!" };
  }
  const hasPurchased = await db.transaction.findFirst({
    where: { userId, movie_id: movieId },
  });
  console.log({ hasPurchased });
  if (hasPurchased) {
    return true;
  } else {
    return false;
  }
};

export const getTransactionByUser = async (userId: string) => {
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "Something Went Wrong!" };
  }
  const transactions = await db.transaction.findMany({ where: { userId } });
  if (!transactions) {
    return { error: "Something Went Wrong!" };
  }
  return { success: transactions };
};
