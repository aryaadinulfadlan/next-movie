import {
  getMovieDetails,
  getMovieSimilar,
  getMovieTrailer,
} from "@/actions/movie";
import NoMovieFounded from "@/components/movie/NoMovieFounded";
import MovieCard from "@/components/movie/MovieCard";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { get500Image } from "@/config";
import { dateFormatter, getCurrentUser } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import BuyMovieAlert from "@/components/movie/BuyMovieAlert";
import { redirect } from "next/navigation";

interface Props {
  params: { movieId: string };
}
export default async function MovieDetail({ params: { movieId } }: Props) {
  const { success: movie } = await getMovieDetails(movieId);
  if (!movie.backdrop_path) {
    redirect("/movies");
  }
  const trailers = (await getMovieTrailer(movieId)).slice(0, 3);
  const similarMovies = await getMovieSimilar(movieId);
  const user = await getCurrentUser();

  return (
    <div className="px-4 xl:px-8">
      <div className="mx-auto w-full max-w-[1200px] my-10 xl:my-16 grid lg:grid-cols-[auto_1fr] lg:gap-x-14 lg:items-end">
        <div
          className="rounded-xl h-[35vh] sm:h-[45vh] xl:h-[60vh] w-[200px] sm:w-[270px] xl:w-[350px] bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              !movie.poster_path
                ? "https://placehold.co/400x600"
                : get500Image(movie.poster_path)
            })`,
          }}
        />
        <div className="mt-6 lg:mt-0 grid gap-2 lg:gap-4">
          <BuyMovieAlert user={user} movie={movie} />
          <h2 className="font-bold lg:text-lg xl:text-4xl">{movie.title}</h2>
          <span className="text-xs xl:text-sm 2xl:text-base italic">
            {dateFormatter(movie.release_date)}
          </span>
          <div className="flex items-center gap-2">
            <StarFilledIcon className="text-yellow-300 lg:w-5 lg:h-5 xl:w-7 xl:h-7" />
            <p className="text-sm font-bold lg:text-base xl:text-xl">
              {Math.round(movie.vote_average * 10) / 10}
            </p>
            <span className="w-2 h-2 rounded-full bg-slate-300 mx-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3" />
            <span className="font-medium underline text-sm lg:text-base xl:text-xl">
              {movie.vote_count} reviews
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-3">
            {movie.genres &&
              movie.genres.slice(0, 3).map((genre) => (
                <Badge variant={"outline"} key={genre.id}>
                  {genre.name}
                </Badge>
              ))}
          </div>
          <p className="text-sm font-medium lg:text-base xl:text-xl mt-3 lg:mt-6 sm:w-[75%] lg:w-[100%]">
            {movie.overview}
          </p>
        </div>
      </div>
      <div className="mt-14 grid gap-[2rem] md:gap-[4rem] py-[1vw] px-[calc(1vw+10px)] max-w-[1400px] mx-auto">
        {!trailers.length ? (
          <NoMovieFounded label="No Trailer Available" />
        ) : (
          <>
            {trailers.map((el) => (
              <div
                className="grid grid-rows-[auto_1fr] gap-1.5 sm:gap-3 xl:gap-6"
                key={el.id}
              >
                <p className="font-semibold text-sm sm:text-base lg:text-xl xl:text-2xl">
                  {el.name}
                </p>
                <iframe
                  src={`https://www.youtube.com/embed/${el.key}`}
                  title={el.name}
                  className="aspect-video w-full"
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="w-full max-w-[1600px] mx-auto px-6 my-[5rem] xl:my-[8rem]">
        {similarMovies.length ? (
          <div className="mb-[5rem] lg:mb-[8rem]">
            <p className="font-bold xl:text-xl 2xl:text-2xl">Similar Movies</p>
            <div className="mt-6">
              <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                  {similarMovies.map((el) => (
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
        ) : (
          <NoMovieFounded label="No Similar Movies Available" />
        )}
      </div>
    </div>
  );
}
