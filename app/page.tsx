import MovieHero from "@/components/movie/MovieHero";
import MovieList from "@/components/movie/MovieList";

export default async function HomePage() {
  return (
    <div className="">
      <MovieHero />
      <div className="w-full max-w-[1600px] mx-auto px-6 my-[5rem] xl:my-[8rem]">
        <MovieList label="Popular Movies" category="popular" isLast={false} />
        <MovieList
          label="Top Rated Movies"
          category="top_rated"
          isLast={false}
        />
        <MovieList label="Upcoming Movies" category="upcoming" isLast={true} />
      </div>
    </div>
  );
}
