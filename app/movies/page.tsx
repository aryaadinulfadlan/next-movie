import { getMovieNowPlaying, getMovieSearch } from "@/actions/movie";
import MovieSearch from "@/components/movie/MovieSearch";
import NoMovieFounded from "@/components/movie/NoMovieFounded";
import MovieCard from "@/components/movie/MovieCard";
import Img from "@/public/header.jpg";
import { Movie } from "@/types/root";

interface Props {
  searchParams: {
    [key: string]: string | Array<string> | undefined;
  };
}
export default async function Movies({ searchParams }: Props) {
  const query = searchParams.query ?? "";
  let movies: Array<Movie> = [];
  if (!query) {
    movies = await getMovieNowPlaying();
  } else {
    movies = await getMovieSearch(query as string);
  }
  return (
    <div>
      <div
        className="bg-no-repeat bg-cover bg-center h-[30vh]"
        style={{ backgroundImage: `url(${Img.src})` }}
      />
      <div className="px-4 xl:px-6 py-10 sm:py-14 lg:py-[4rem] max-w-[1600px] w-full mx-auto grid gap-8 lg:gap-12 2xl:gap-16">
        <MovieSearch />
        {!movies.length ? (
          <NoMovieFounded label="No Movie Found" />
        ) : (
          <div className="grid gap-y-6 lg:gap-y-8 xl:gap-y-10 2xl:gap-y-14 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {movies.map((el, idx) => (
              <div
                className="h-[25rem] sm:h-[27rem] 2xl:h-[33rem]"
                key={`${el.id}-${idx}`}
              >
                <MovieCard movie={el} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
