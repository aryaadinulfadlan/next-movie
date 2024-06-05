"use client";

import { get500Image } from "@/config";
import { dateFormatter } from "@/lib/utils";
import { Movie } from "@/types/root";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface Props {
  movie: Movie;
}
export default function MovieCard({ movie }: Props) {
  const router = useRouter();
  return (
    <div className="h-full max-w-[15rem] sm:max-w-[17rem] 2xl:max-w-[20rem] w-full mx-auto bg-[#393737] rounded-xl grid grid-rows-[1fr_auto] gap-6 2xl:gap-8">
      <div
        onClick={() => router.push(`/movie/${movie.id}`)}
        style={{
          backgroundImage: `url(${
            !movie.poster_path
              ? "https://placehold.co/400x600"
              : get500Image(movie.poster_path)
          })`,
        }}
        className="bg-no-repeat bg-cover bg-center rounded-t-xl cursor-pointer relative before:absolute before:inset-0 before:bg-black/50 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 flex items-center justify-center show_play_icon"
      >
        <FaPlay className="text-[red] text-[1.5rem] 2xl:text-[2.5rem] hidden z-10" />
      </div>
      <div className="px-4 grid gap-3 pb-4 2xl:pb-6">
        <div className="flex items-center gap-2">
          <StarFilledIcon className="text-yellow-300 w-3.5 h-3.5 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
          <p className="text-xs font-bold lg:text-sm 2xl:text-base">
            {Math.round(movie.vote_average * 10) / 10}
          </p>
          <span className="w-2 h-2 rounded-full bg-slate-300 mx-1 lg:w-2.5 lg:h-2.5" />
          <span className="text-xs xl:text-sm 2xl:text-base italic">
            {dateFormatter(movie.release_date)}
          </span>
        </div>
        <p className="text-sm xl:text-base 2xl:text-lg font-medium truncate">
          {movie.title}
        </p>
      </div>
    </div>
  );
}
