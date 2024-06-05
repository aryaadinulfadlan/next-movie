import { getMovieByCategory } from "@/actions/movie";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  category: "upcoming" | "top_rated" | "popular";
  isLast: boolean;
}
export default async function MovieList({ label, category, isLast }: Props) {
  const movies = await getMovieByCategory(category);
  return (
    <div
      className={cn("", {
        "mb-[5rem]": !isLast,
      })}
    >
      <p className="font-bold xl:text-xl 2xl:text-2xl">{label}</p>
      <div className="mt-6">
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {movies.map((el) => (
              <CarouselItem
                key={el.id}
                className="h-[25rem] sm:h-[27rem] 2xl:h-[33rem] sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
              >
                <MovieCard movie={el} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
