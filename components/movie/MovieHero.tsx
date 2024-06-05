import { getMovieNowPlaying } from "@/actions/movie";
import MovieHeroSlider from "./MovieHeroSlider";
import { getCurrentUser } from "@/lib/utils";

export default async function MovieHero() {
  const movies = await getMovieNowPlaying();
  const user = await getCurrentUser();
  return (
    <div className="">
      <MovieHeroSlider user={user} movies={movies} />
    </div>
  );
}
