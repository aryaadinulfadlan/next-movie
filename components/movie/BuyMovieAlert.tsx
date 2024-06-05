"use client";

import { buyMovie } from "@/actions/transaction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ExtendedUser } from "@/next-auth";
import { Movie, Transaction } from "@/types/root";
import { useTransition } from "react";
import { toast } from "sonner";
import { AiOutlineReload } from "react-icons/ai";

interface Props {
  user: ExtendedUser | undefined;
  movie: Movie;
}
export default function BuyMovieAlert({ user, movie }: Props) {
  const [isPending, startTransition] = useTransition();
  const handleBuy = (rate: number, transaction: Transaction) => {
    const movie_rate = Math.round(rate * 10) / 10;
    let movie_price = 0;
    if (movie_rate < 3) movie_price = 7500;
    if (movie_rate >= 3 && movie_rate < 6) movie_price = 17500;
    if (movie_rate >= 6 && movie_rate < 8) movie_price = 37350;
    if (movie_rate >= 8) movie_price = 57250;
    if (movie_price > user!.saldo) {
      return toast.error("Error!", {
        description: "You don't have enough money!",
      });
    }
    startTransition(() => {
      buyMovie(user!.id, transaction, movie_price)
        .then((response) => {
          if (response.error) {
            toast.error("Failed!", { description: response.error });
          }
          if (response.success) {
            toast.success("Success!", { description: response.success });
          }
        })
        .catch(() => toast.error("Something Went Wrong!"));
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          className="capitalize w-fit bg-green-700 rounded-full font-bold xl:text-xl xl:p-[1.5rem_2rem] relative"
        >
          {isPending && (
            <AiOutlineReload className="w-6 h-6 xl:w-8 2xl:w-10 2xl:h-10 xl:h-8 animate-spin absolute" />
          )}
          make it yours
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Buy this movie?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-700"
            onClick={() =>
              handleBuy(movie.vote_average, {
                movie_id: movie.id,
                movie_overview: movie.overview,
                movie_poster_path: movie.poster_path,
                movie_rating: movie.vote_average.toString(),
                movie_release_date: movie.release_date,
                movie_review: movie.vote_count,
                movie_title: movie.title,
              })
            }
          >
            I want this
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
